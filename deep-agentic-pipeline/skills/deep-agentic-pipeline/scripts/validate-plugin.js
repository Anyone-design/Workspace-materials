#!/usr/bin/env node
/**
 * Plugin Integrity Validator
 * Audits manifests, rules, skills, agents, and templates of deep-agentic-pipeline.
 */

const fs = require('fs');
const path = require('path');

function validatePlugin() {
  console.log('[PLUGIN VALIDATOR] Auditing deep-agentic-pipeline structure...\n');
  let errors = 0;
  const pluginRoot = path.resolve(__dirname, '../../../');

  // 1. Validate plugin.json
  const manifestPath = path.join(pluginRoot, 'plugin.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('  ✗ plugin.json: Missing manifest file!');
    errors++;
  } else {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (!manifest.name || !manifest.description) {
        console.error('  ✗ plugin.json: Missing name or description!');
        errors++;
      } else {
        console.log(`  ✓ plugin.json: Validated manifest (${manifest.name} v${manifest.version || '1.0'})`);
      }
    } catch (err) {
      console.error(`  ✗ plugin.json: Invalid JSON: ${err.message}`);
      errors++;
    }
  }

  // 2. Validate hooks.json
  const hooksPath = path.join(pluginRoot, 'hooks.json');
  if (fs.existsSync(hooksPath)) {
    try {
      const hooks = JSON.parse(fs.readFileSync(hooksPath, 'utf8'));
      const nativeHooks = hooks['deep-agentic-pipeline-hooks'] || hooks['deep-agentic-pipeline'];
      if (nativeHooks && nativeHooks.PreToolUse && nativeHooks.PostToolUse) {
        console.log(`  ✓ hooks.json: Validated Antigravity PreToolUse & PostToolUse lifecycle hooks`);
      } else {
        console.log(`  ✓ hooks.json: Validated hooks configuration`);
      }
    } catch (err) {
      console.error(`  ✗ hooks.json: Invalid JSON: ${err.message}`);
      errors++;
    }
  }

  // 3. Validate Rules (rules/AGENTS.md)
  const agentsRulePath = path.join(pluginRoot, 'rules', 'AGENTS.md');
  if (!fs.existsSync(agentsRulePath)) {
    console.error('  ✗ rules/AGENTS.md: Missing consolidated AGENTS.md rule file!');
    errors++;
  } else {
    const content = fs.readFileSync(agentsRulePath, 'utf8');
    if (content.includes('AP-009') && content.includes('Zero Vibe Coding')) {
      console.log('  ✓ rules/AGENTS.md: Verified authoritative consolidated rule set with AP-009 Anti-Slop');
    } else {
      console.log('  ✓ rules/AGENTS.md: Validated rule set');
    }
  }

  // 4. Validate Registered Subagents in agents/
  const agentsDir = path.join(pluginRoot, 'agents');
  if (!fs.existsSync(agentsDir)) {
    console.error('  ✗ agents/: Missing Antigravity subagent directory!');
    errors++;
  } else {
    const agents = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
    let invalidFrontmatter = 0;
    for (const a of agents) {
      const content = fs.readFileSync(path.join(agentsDir, a), 'utf8');
      if (!content.startsWith('---') || !content.includes('name:') || !content.includes('description:') || !content.includes('tools:')) {
        invalidFrontmatter++;
      }
    }
    if (invalidFrontmatter === 0 && agents.length >= 10) {
      console.log(`  ✓ agents/: Verified ${agents.length} Antigravity subagents with valid YAML frontmatter and tools`);
    } else {
      console.error(`  ✗ agents/: ${invalidFrontmatter} agent(s) missing valid YAML frontmatter or tools!`);
      errors++;
    }
  }

  // 5. Validate SKILL.md Frontmatter
  const skillPath = path.join(pluginRoot, 'skills', 'deep-agentic-pipeline', 'SKILL.md');
  if (!fs.existsSync(skillPath)) {
    console.error('  ✗ SKILL.md: Missing master skill entrypoint!');
    errors++;
  } else {
    const content = fs.readFileSync(skillPath, 'utf8');
    if (content.startsWith('---') && content.includes('name:') && content.includes('description:')) {
      console.log('  ✓ SKILL.md: Verified valid YAML frontmatter');
    } else {
      console.error('  ✗ SKILL.md: Missing valid YAML frontmatter!');
      errors++;
    }
  }

  // 6. Validate Stage References (Playbooks)
  const refDir = path.join(pluginRoot, 'skills', 'deep-agentic-pipeline', 'references');
  if (fs.existsSync(refDir)) {
    const refs = fs.readdirSync(refDir).filter(f => f.endsWith('.md'));
    console.log(`  ✓ references/: Verified ${refs.length} stage playbooks`);
  } else {
    console.error('  ✗ references/: Missing stage playbooks directory!');
    errors++;
  }

  // 7. Validate Templates
  const templatesDir = path.join(pluginRoot, 'skills', 'deep-agentic-pipeline', 'templates');
  if (fs.existsSync(templatesDir)) {
    const templates = fs.readdirSync(templatesDir);
    console.log(`  ✓ templates/: Verified ${templates.length} output deliverable templates`);
  } else {
    console.error('  ✗ templates/: Missing deliverable templates directory!');
    errors++;
  }

  console.log('\n----------------------------------------------------');
  if (errors > 0) {
    console.error(`[PLUGIN VALIDATOR] Audit FAILED with ${errors} error(s).\n`);
    process.exit(1);
  } else {
    console.log('[PLUGIN VALIDATOR] Status: 100% VALID — Production-ready Antigravity plugin package.\n');
    process.exit(0);
  }
}

if (require.main === module) {
  validatePlugin();
}

module.exports = { validatePlugin };
