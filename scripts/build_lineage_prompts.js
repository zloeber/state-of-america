#!/usr/bin/env node
/*
 * build_lineage_prompts.js — Updates the america-state-research explorer
 * to include full prompt content in the PROMPTS data for the Lineage tab.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8').trim();

// Read all prompts
const prompts = {
  '000': { title: 'Root Prompt (Verbatim)', path: 'prompts/000_root_prompt.md', summary: 'Original user request - the verbatim root of all research lineage.', content: read('prompts/000_root_prompt.md') },
  '001': { title: 'Research Decomposition', path: 'prompts/001_research_decomposition.md', summary: 'Breaks root question into domain-specific sub-questions for parallel investigation.', content: read('prompts/001_research_decomposition.md') },
  '002': { title: 'Domain Agent Prompts', path: 'prompts/002_domain_agent_prompts.md', summary: 'Domain-specific prompts for economics, wealth, fiscal, health, freedom, crises, social stability, and political history.', content: read('prompts/002_domain_agent_prompts.md') },
  '003': { title: 'Verification & Red Team', path: 'prompts/003_verification_and_red_team_prompts.md', summary: 'Falsification prompts designed to challenge every major conclusion.', content: read('prompts/003_verification_and_red_team_prompts.md') },
  '004': { title: 'Synthesis & Publication', path: 'prompts/004_synthesis_and_publication_prompts.md', summary: 'Final integration prompts - merges domain findings into coherent report, presentation, and explorer.', content: read('prompts/004_synthesis_and_publication_prompts.md') }
};

// Read the explorer
let explorer = fs.readFileSync(path.join(ROOT, 'explorer', 'index.html'), 'utf8');

// Find and replace the PROMPTS line (handle nested braces)
const promptsStart = explorer.indexOf('const PROMPTS = ');
if (promptsStart === -1) {
  console.error('Could not find const PROMPTS in explorer');
  process.exit(1);
}

// Find the end of the PROMPTS object by counting braces
let braceCount = 0;
let promptsEnd = -1;
for (let i = promptsStart + 'const PROMPTS = '.length; i < explorer.length; i++) {
  if (explorer[i] === '{') braceCount++;
  if (explorer[i] === '}') braceCount--;
  if (braceCount === 0) {
    promptsEnd = i + 1;
    break;
  }
}

if (promptsEnd === -1) {
  console.error('Could not find end of PROMPTS object');
  process.exit(1);
}

const newPromptsLine = `const PROMPTS = ${JSON.stringify(prompts)};`;
explorer = explorer.substring(0, promptsStart) + newPromptsLine + explorer.substring(promptsEnd);

// Write the updated explorer
fs.writeFileSync(path.join(ROOT, 'explorer', 'index.html'), explorer);
console.log('Updated explorer with full prompt content (' + (explorer.length / 1024).toFixed(1) + ' KB)');
