/**
 * LINEAGE 3D — Interactive Prompt-to-Claim Trace
 * 
 * A Three.js visualization that traces the research lineage from root prompts
 * through domain agents to final claims, with search, click-to-trace, and
 * cinematic camera movements.
 * 
 * Usage:
 *   Lineage3D.init(container, { lineageChain, executionGraph, claims, sources })
 *   Lineage3D.search(query)
 *   Lineage3D.focusNode(nodeId)
 *   Lineage3D.resetView()
 */

const Lineage3D = (() => {
  // ─── State ───────────────────────────────────────────────────────────────
  let scene, camera, renderer, controls;
  let nodes = [], edges = [], labels = [];
  let raycaster, mouse, hoveredNode = null, selectedNode = null;
  let animationQueue = [];
  let searchResults = [];
  let isAnimating = false;
  let container, width, height;
  let particles = []; // Particle trails
  let particlePool = []; // Reusable particle geometries
  
  // ─── Configuration ───────────────────────────────────────────────────────
  const CONFIG = {
    nodeSize: {
      prompt: 0.8,
      agent: 0.6,
      data: 0.4,
      claim: 0.5,
      output: 0.35
    },
    nodeColors: {
      prompt: 0x4FC3F7,    // Light blue
      agent: 0x81C784,     // Green
      data: 0xFFB74D,      // Orange
      claim: 0xE57373,     // Red
      output: 0xBA68C8,    // Purple
      root: 0xFFD54F,      // Gold (root prompt)
      selected: 0xFFFFFF,  // White
      hovered: 0x29B6F6     // Bright blue
    },
    camera: {
      fov: 60,
      near: 0.1,
      far: 1000,
      initialPosition: { x: 0, y: 8, z: 20 }
    },
    animation: {
      duration: 800,
      easing: 'easeInOutCubic'
    },
    layout: {
      verticalSpacing: 3,
      horizontalSpread: 2.5,
      depthSpread: 1.5
    }
  };

  // ─── Easing Functions ────────────────────────────────────────────────────
  const easing = {
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutBack: t => { const c1 = 1.70158; const c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    easeOutElastic: t => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1
  };

  // ─── Node Types ──────────────────────────────────────────────────────────
  function getNodeType(id, label) {
    const lowerId = (id || '').toLowerCase();
    const lowerLabel = (label || '').toLowerCase();
    
    if (lowerId.includes('root') || lowerId.includes('000')) return 'root';
    if (lowerId.includes('prompt') || lowerLabel.includes('prompt')) return 'prompt';
    if (lowerId.includes('agent') || lowerLabel.includes('agent')) return 'agent';
    if (lowerId.includes('claim') || lowerLabel.includes('claim')) return 'claim';
    if (lowerId.includes('data') || lowerId.includes('normalized') || lowerId.includes('derived')) return 'data';
    if (lowerLabel.includes('explorer') || lowerLabel.includes('presentation') || lowerLabel.includes('report')) return 'output';
    return 'agent';
  }

  // ─── Layout Calculation ──────────────────────────────────────────────────
  function calculateLayout(graph) {
    const nodeMap = new Map();
    const layers = new Map();
    
    // Build adjacency and compute depths
    const children = new Map();
    const parents = new Map();
    
    if (graph.nodes && Array.isArray(graph.nodes)) {
      // Array format (corruption research)
      graph.nodes.forEach(node => {
        nodeMap.set(node.id, node);
        if (!children.has(node.parent)) children.set(node.parent, []);
        children.get(node.parent).push(node.id);
        parents.set(node.id, node.parent);
      });
    } else if (graph.nodes && typeof graph.nodes === 'object') {
      // Object format (state research)
      Object.values(graph.nodes).forEach(node => {
        nodeMap.set(node.id, node);
      });
      // Use edges for parent-child relationships
      if (graph.edges) {
        graph.edges.forEach(([from, to]) => {
          if (!children.has(from)) children.set(from, []);
          children.get(from).push(to);
          parents.set(to, from);
        });
      }
    }
    
    // BFS to assign layers
    const root = graph.root || (graph.nodes && Array.isArray(graph.nodes) ? graph.nodes[0]?.id : 'N-ROOT');
    const queue = [{ id: root, depth: 0 }];
    const visited = new Set();
    
    while (queue.length > 0) {
      const { id, depth } = queue.shift();
      if (visited.has(id)) continue;
      visited.add(id);
      
      if (!layers.has(depth)) layers.set(depth, []);
      layers.get(depth).push(id);
      
      const nodeChildren = children.get(id) || [];
      nodeChildren.forEach(childId => {
        if (!visited.has(childId)) {
          queue.push({ id: childId, depth: depth + 1 });
        }
      });
    }
    
    // Add unvisited nodes
    nodeMap.forEach((node, id) => {
      if (!visited.has(id)) {
        const maxDepth = Math.max(...layers.keys(), 0);
        if (!layers.has(maxDepth + 1)) layers.set(maxDepth + 1, []);
        layers.get(maxDepth + 1).push(id);
      }
    });
    
    // Calculate 3D positions
    const positions = new Map();
    const maxDepth = Math.max(...layers.keys(), 0);
    
    layers.forEach((nodeIds, depth) => {
      const y = (depth - maxDepth / 2) * CONFIG.layout.verticalSpacing;
      const count = nodeIds.length;
      
      nodeIds.forEach((id, i) => {
        const angle = (i / count) * Math.PI * 2;
        const radius = count > 1 ? (count / 2) * CONFIG.layout.horizontalSpread : 0;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * CONFIG.layout.depthSpread * (count / 2);
        
        positions.set(id, { x, y, z, depth, index: i, total: count });
      });
    });
    
    return { nodeMap, layers, positions };
  }

  // ─── Scene Setup ─────────────────────────────────────────────────────────
  function initScene(containerEl) {
    container = containerEl;
    width = container.clientWidth;
    height = container.clientHeight;
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.015);
    
    // Camera
    camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, width / height, CONFIG.camera.near, CONFIG.camera.far);
    camera.position.set(
      CONFIG.camera.initialPosition.x,
      CONFIG.camera.initialPosition.y,
      CONFIG.camera.initialPosition.z
    );
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x4FC3F7, 0.5, 50);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(40, 40, 0x222233, 0x111122);
    gridHelper.position.y = -8;
    scene.add(gridHelper);
    
    // Raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
  }

  // ─── Create 3D Objects ───────────────────────────────────────────────────
  function createNodeMesh(node, position, type) {
    const size = CONFIG.nodeSize[type] || 0.5;
    const color = CONFIG.nodeColors[type] || CONFIG.nodeColors.agent;
    
    // Geometry based on type
    let geometry;
    switch (type) {
      case 'root':
      case 'prompt':
        geometry = new THREE.OctahedronGeometry(size, 0);
        break;
      case 'claim':
        geometry = new THREE.TetrahedronGeometry(size, 0);
        break;
      case 'data':
        geometry = new THREE.BoxGeometry(size, size, size);
        break;
      case 'output':
        geometry = new THREE.DodecahedronGeometry(size, 0);
        break;
      default:
        geometry = new THREE.SphereGeometry(size, 16, 16);
    }
    
    // Material with glow effect
    const material = new THREE.MeshPhongMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    // Store node data
    mesh.userData = {
      id: node.id,
      label: node.label || node.task || node.id,
      type: type,
      originalColor: color,
      node: node
    };
    
    // Add glow ring for root/claim nodes
    if (type === 'root' || type === 'claim') {
      const ringGeometry = new THREE.RingGeometry(size * 1.2, size * 1.5, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      mesh.add(ring);
    }
    
    return mesh;
  }

  function createEdge(fromPos, toPos, color = 0x333355) {
    const points = [
      new THREE.Vector3(fromPos.x, fromPos.y, fromPos.z),
      new THREE.Vector3(toPos.x, toPos.y, toPos.z)
    ];
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      linewidth: 2
    });
    
    const edge = new THREE.Line(geometry, material);
    edge.userData = { from: fromPos, to: toPos, color: color };
    return edge;
  }

  // ─── Particle System ─────────────────────────────────────────────────────
  function createParticle(fromPos, toPos, color) {
    // Create a small glowing sphere particle
    const geometry = new THREE.SphereGeometry(0.08, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    });
    
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set(fromPos.x, fromPos.y, fromPos.z);
    particle.userData = {
      from: fromPos,
      to: toPos,
      progress: 0,
      speed: 0.005 + Math.random() * 0.005, // Vary speed slightly
      color: color
    };
    
    // Add glow ring around particle
    const ringGeometry = new THREE.RingGeometry(0.1, 0.15, 16);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    particle.add(ring);
    
    return particle;
  }

  function updateParticles(time) {
    particles.forEach(particle => {
      if (!particle.parent) return;
      
      const data = particle.userData;
      data.progress += data.speed;
      
      // Loop particle back to start when it reaches the end
      if (data.progress >= 1) {
        data.progress = 0;
      }
      
      // Calculate position along edge using easing
      const t = easing.easeInOutCubic(data.progress);
      particle.position.lerpVectors(data.from, data.to, t);
      
      // Pulse opacity based on position
      const pulse = Math.sin(time * 3 + data.progress * Math.PI * 2) * 0.3 + 0.7;
      particle.material.opacity = pulse * 0.8;
      
      // Rotate ring for visual effect
      particle.children[0].rotation.z = time * 2;
    });
  }

  function spawnParticlesForEdges() {
    // Remove existing particles
    particles.forEach(p => scene.remove(p));
    particles = [];
    
    // Create particles for each edge
    edges.forEach(edge => {
      const { from, to, color } = edge.userData;
      
      // Create multiple particles per edge with staggered start
      const numParticles = 2 + Math.floor(Math.random() * 2); // 2-3 particles
      for (let i = 0; i < numParticles; i++) {
        const particle = createParticle(from, to, color);
        particle.userData.progress = i / numParticles; // Stagger start positions
        scene.add(particle);
        particles.push(particle);
      }
    });
  }

  function createLabel(text, position, color = 0xffffff) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    
    // Background
    context.fillStyle = 'rgba(10, 10, 15, 0.8)';
    context.roundRect(0, 0, canvas.width, canvas.height, 10);
    context.fill();
    
    // Text
    context.fillStyle = '#' + color.toString(16).padStart(6, '0');
    context.font = 'bold 28px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Word wrap
    const maxWidth = canvas.width - 20;
    const words = text.split(' ');
    let line = '';
    let y = canvas.height / 2;
    
    for (let word of words) {
      const testLine = line + word + ' ';
      if (context.measureText(testLine).width > maxWidth) {
        context.fillText(line, canvas.width / 2, y - 14);
        line = word + ' ';
        y += 28;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, canvas.width / 2, y - 14);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    });
    
    const sprite = new THREE.Sprite(material);
    sprite.position.set(position.x, position.y + 1.2, position.z);
    sprite.scale.set(4, 1, 1);
    
    return sprite;
  }

  // ─── Build Graph ─────────────────────────────────────────────────────────
  function buildGraph(data) {
    const { lineageChain, executionGraph, claims, sources } = data;
    
    // Clear existing
    nodes.forEach(n => scene.remove(n));
    edges.forEach(e => scene.remove(e));
    labels.forEach(l => scene.remove(l));
    particles.forEach(p => scene.remove(p));
    nodes = [];
    edges = [];
    labels = [];
    particles = [];
    
    // Calculate layout
    const { nodeMap, layers, positions } = calculateLayout(executionGraph);
    
    // Create node meshes
    positions.forEach((pos, id) => {
      const node = nodeMap.get(id) || { id, label: id };
      const type = getNodeType(id, node.label || node.task);
      const mesh = createNodeMesh(node, pos, type);
      scene.add(mesh);
      nodes.push(mesh);
      
      // Add label
      const label = createLabel(node.label || node.task || id, pos, CONFIG.nodeColors[type]);
      scene.add(label);
      labels.push(label);
    });
    
    // Create edges
    if (executionGraph.edges && Array.isArray(executionGraph.edges)) {
      executionGraph.edges.forEach(edge => {
        let fromId, toId;
        if (Array.isArray(edge)) {
          [fromId, toId] = edge;
        } else {
          fromId = edge.from;
          toId = edge.to;
        }
        
        const fromPos = positions.get(fromId);
        const toPos = positions.get(toId);
        
        if (fromPos && toPos) {
          const fromNode = nodeMap.get(fromId);
          const fromType = getNodeType(fromId, fromNode?.label);
          const edgeMesh = createEdge(fromPos, toPos, CONFIG.nodeColors[fromType] || 0x333355);
          scene.add(edgeMesh);
          edges.push(edgeMesh);
        }
      });
    }
    
    // Add floating claim nodes if claims data provided
    if (claims && claims.length > 0) {
      const claimStartY = -6;
      const claimSpacing = 2;
      
      claims.slice(0, 10).forEach((claim, i) => {
        const angle = (i / Math.min(claims.length, 10)) * Math.PI * 2;
        const radius = 12;
        const pos = {
          x: Math.cos(angle) * radius,
          y: claimStartY,
          z: Math.sin(angle) * radius
        };
        
        const claimNode = {
          id: claim.id || `claim-${i}`,
          label: (claim.claim || claim.text || '').substring(0, 50) + '...',
          type: 'claim'
        };
        
        const mesh = createNodeMesh(claimNode, pos, 'claim');
        scene.add(mesh);
        nodes.push(mesh);
        
        const label = createLabel(claimNode.label, pos, CONFIG.nodeColors.claim);
        scene.add(label);
        labels.push(label);
      });
    }
    
    // Center camera on graph
    fitCameraToGraph();
    
    // Spawn particle trails along edges
    spawnParticlesForEdges();
  }

  // ─── Camera Controls ─────────────────────────────────────────────────────
  function fitCameraToGraph() {
    if (nodes.length === 0) return;
    
    const box = new THREE.Box3();
    nodes.forEach(node => box.expandByObject(node));
    
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 1.5;
    
    animateCamera(
      center.x,
      center.y + distance * 0.3,
      center.z + distance
    );
  }

  function animateCamera(x, y, z, duration = CONFIG.animation.duration) {
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(x, y, z);
    const startTime = Date.now();
    
    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing.easeInOutCubic(progress);
      
      camera.position.lerpVectors(startPos, endPos, easedProgress);
      controls.update();
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    update();
  }

  function focusNode(nodeId) {
    const node = nodes.find(n => n.userData.id === nodeId);
    if (!node) return;
    
    // Reset all nodes
    nodes.forEach(n => {
      n.material.emissiveIntensity = 0.3;
      n.scale.set(1, 1, 1);
    });
    
    // Highlight selected node
    node.material.emissiveIntensity = 0.8;
    node.scale.set(1.3, 1.3, 1.3);
    selectedNode = node;
    
    // Animate camera to focus on node
    const pos = node.position;
    animateCamera(pos.x + 3, pos.y + 2, pos.z + 5);
    
    // Highlight connected edges
    highlightConnections(nodeId);
  }

  function highlightConnections(nodeId) {
    edges.forEach(edge => {
      edge.material.opacity = 0.1;
    });
    
    // Find and highlight connected edges
    const connectedNodes = new Set();
    connectedNodes.add(nodeId);
    
    edges.forEach(edge => {
      const from = nodes.find(n => 
        Math.abs(n.position.x - edge.geometry.attributes.position.array[0]) < 0.1 &&
        Math.abs(n.position.y - edge.geometry.attributes.position.array[1]) < 0.1
      );
      const to = nodes.find(n => 
        Math.abs(n.position.x - edge.geometry.attributes.position.array[3]) < 0.1 &&
        Math.abs(n.position.y - edge.geometry.attributes.position.array[4]) < 0.1
      );
      
      if (from && to && (from.userData.id === nodeId || to.userData.id === nodeId)) {
        edge.material.opacity = 0.9;
        connectedNodes.add(from.userData.id);
        connectedNodes.add(to.userData.id);
      }
    });
    
    // Dim unconnected nodes
    nodes.forEach(n => {
      if (!connectedNodes.has(n.userData.id)) {
        n.material.opacity = 0.3;
      }
    });
  }

  function resetView() {
    // Reset all nodes
    nodes.forEach(n => {
      n.material.emissiveIntensity = 0.3;
      n.material.opacity = 0.9;
      n.scale.set(1, 1, 1);
    });
    
    // Reset all edges
    edges.forEach(e => {
      e.material.opacity = 0.4;
    });
    
    selectedNode = null;
    fitCameraToGraph();
  }

  // ─── Search Functionality ────────────────────────────────────────────────
  function search(query) {
    if (!query || query.length < 2) {
      resetView();
      return [];
    }
    
    const lowerQuery = query.toLowerCase();
    searchResults = [];
    
    nodes.forEach(node => {
      const label = (node.userData.label || '').toLowerCase();
      const id = (node.userData.id || '').toLowerCase();
      
      if (label.includes(lowerQuery) || id.includes(lowerQuery)) {
        searchResults.push(node);
        node.material.emissiveIntensity = 0.8;
        node.scale.set(1.2, 1.2, 1.2);
      } else {
        node.material.emissiveIntensity = 0.1;
        node.material.opacity = 0.3;
        node.scale.set(0.8, 0.8, 0.8);
      }
    });
    
    // Fit camera to search results
    if (searchResults.length > 0) {
      const box = new THREE.Box3();
      searchResults.forEach(node => box.expandByObject(node));
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim * 2;
      
      animateCamera(center.x, center.y + distance * 0.3, center.z + distance);
    }
    
    return searchResults.map(n => ({
      id: n.userData.id,
      label: n.userData.label,
      type: n.userData.type
    }));
  }

  // ─── Event Handlers ──────────────────────────────────────────────────────
  function onWindowResize() {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodes);
    
    if (intersects.length > 0) {
      const node = intersects[0].object;
      
      if (hoveredNode !== node) {
        if (hoveredNode) {
          hoveredNode.material.emissiveIntensity = 0.3;
          hoveredNode.scale.set(1, 1, 1);
        }
        
        hoveredNode = node;
        node.material.emissiveIntensity = 0.6;
        node.scale.set(1.1, 1.1, 1.1);
        renderer.domElement.style.cursor = 'pointer';
      }
    } else {
      if (hoveredNode) {
        hoveredNode.material.emissiveIntensity = 0.3;
        hoveredNode.scale.set(1, 1, 1);
        hoveredNode = null;
        renderer.domElement.style.cursor = 'default';
      }
    }
  }

  function onMouseClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodes);
    
    if (intersects.length > 0) {
      const node = intersects[0].object;
      focusNode(node.userData.id);
      
      // Dispatch custom event with node details
      const event = new CustomEvent('lineage3d:nodeClick', {
        detail: {
          id: node.userData.id,
          label: node.userData.label,
          type: node.userData.type,
          node: node.userData.node
        }
      });
      container.dispatchEvent(event);
    }
  }

  // ─── Animation Loop ──────────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Gentle rotation for idle nodes
    nodes.forEach((node, i) => {
      if (node !== hoveredNode && node !== selectedNode) {
        node.rotation.y = Math.sin(time + i * 0.5) * 0.1;
      }
    });
    
    // Pulse effect for root nodes
    nodes.forEach(node => {
      if (node.userData.type === 'root') {
        const pulse = 1 + Math.sin(time * 2) * 0.05;
        node.scale.set(pulse, pulse, pulse);
      }
    });
    
    // Update particle animations
    updateParticles(time);
    
    controls.update();
    renderer.render(scene, camera);
  }

  // ─── Public API ──────────────────────────────────────────────────────────
  return {
    init(containerEl, data) {
      initScene(containerEl);
      buildGraph(data);
      animate();
      
      // Return API
      return {
        search,
        focusNode,
        resetView,
        fitCameraToGraph,
        getNodes: () => nodes.map(n => ({
          id: n.userData.id,
          label: n.userData.label,
          type: n.userData.type
        }))
      };
    },
    
    search,
    focusNode,
    resetView,
    fitCameraToGraph
  };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Lineage3D;
}
