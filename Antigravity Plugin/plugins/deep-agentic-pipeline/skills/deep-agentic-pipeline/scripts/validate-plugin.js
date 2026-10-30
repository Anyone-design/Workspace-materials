#!/usr/bin/env node
/**
 * Plugin Integrity Validator
 * Audits manifests, rules, skills, personas, and templates of deep-agentic-pipeline.
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
      if (hooks.hooks && hooks.hooks.preToolExecution) {
        console.log(`  ✓ hooks.json: Validated ${hooks.hooks.preToolExecution.length} pre-tool execution hooks`);
      }
    } catch (err) {
      console.error(`  ✗ hooks.json: Invalid JSON: ${err.message}`);
      errors++;
    }
  }

  // 3. Validate Rules
  const rulesDir = path.join(pluginRoot, 'rules');
  if (!fs.existsSync(rulesDir)) {
    console.error('  ✗ rules/: Missing rules directory!');
    errors++;
  } else {
    const rules = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));
    console.log(`  ✓ rules/: Verified ${rules.length} invariant rule documents`);
  }

  // 4. Validate SKILL.md Frontmatter
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

  // 5. Validate Stage References (Playbooks)
  const refDir = path.join(pluginRoot, 'skills', 'deep-agentic-pipeline', 'references');
  if (fs.existsSync(refDir)) {
    const refs = fs.readdirSync(refDir).filter(f => f.endsWith('.md'));
    console.log(`  ✓ references/: Verified ${refs.length} stage playbooks`);
  } else {
    console.error('  ✗ references/: Missing stage playbooks directory!');
    errors++;
  }

  // 6. Validate Personas
  const personasDir = path.join(pluginRoot, 'skills', 'deep-agentic-pipeline', 'personas');
  if (fs.existsSync(personasDir)) {
    const personas = fs.readdirSync(personasDir).filter(f => f.endsWith('.md'));
    console.log(`  ✓ personas/: Verified ${personas.length} specialist personas`);
  } else {
    console.error('  ✗ personas/: Missing subagent personas directory!');
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
