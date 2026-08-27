#!/usr/bin/env node
/*
 * build_lineage_3d.js — Inlines Three.js and OrbitControls into the
 * america-state-research explorer for self-contained preview rendering.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Read the vendor files
const threeMin = fs.readFileSync(path.join(ROOT, 'explorer', 'vendor', 'three.min.js'), 'utf8');
const orbitControls = fs.readFileSync(path.join(ROOT, 'explorer', 'vendor', 'OrbitControls.js'), 'utf8');

// Read the explorer
let explorer = fs.readFileSync(path.join(ROOT, 'explorer', 'index.html'), 'utf8');

// Replace the dynamic script loading with inline scripts
const oldLoader = `  if (typeof THREE === 'undefined') {
    const script1 = document.createElement('script');
    script1.src = 'vendor/three.min.js';
    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'vendor/OrbitControls.js';
      script2.onload = () => waitForThreeJS(initLineage3D);
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
  } else {
    waitForThreeJS(initLineage3D);
  }`;

const newLoader = `  if (typeof THREE === 'undefined') {
    // Inline Three.js and OrbitControls
    const s1 = document.createElement('script');
    s1.textContent = ${JSON.stringify(threeMin)};
    document.head.appendChild(s1);
    const s2 = document.createElement('script');
    s2.textContent = ${JSON.stringify(orbitControls)};
    document.head.appendChild(s2);
    waitForThreeJS(initLineage3D);
  } else {
    waitForThreeJS(initLineage3D);
  }`;

explorer = explorer.replace(oldLoader, newLoader);

// Write the updated explorer
fs.writeFileSync(path.join(ROOT, 'explorer', 'index.html'), explorer);
console.log('Built explorer with inlined Three.js (' + (explorer.length / 1024).toFixed(1) + ' KB)');
