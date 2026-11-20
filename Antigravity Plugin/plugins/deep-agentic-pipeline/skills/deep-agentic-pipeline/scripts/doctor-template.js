#!/usr/bin/env node
/**
 * Doctor Diagnostic Script Template
 * Used by Stage 6 (SRE Specialist) to generate 'npm run doctor'
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

async function runDoctor() {
  console.log('[DOCTOR] Running Pre-Flight Health Diagnostic...\n');
  let errors = 0;

  // 1. Runtime Version Audit
  const nodeVersion = process.versions.node;
  const major = parseInt(nodeVersion.split('.')[0], 10);
  if (major < 20) {
    console.error(`  ✗ Node Runtime: v${nodeVersion} is outdated. Require Node.js v20.x or higher.`);
    errors++;
  } else {
    console.log(`  ✓ Node Runtime: v${nodeVersion} (Supported)`);
  }

  // 2. Environment Parity Audit
  const envExamplePath = path.resolve(process.cwd(), '.env.example');
  const envPath = path.resolve(process.cwd(), '.env');

  if (fs.existsSync(envExamplePath)) {
    const exampleKeys = fs.readFileSync(envExamplePath, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('=')[0].trim());

    if (!fs.existsSync(envPath)) {
      console.error(`  ✗ Environment: .env file is missing! Create it from .env.example.`);
      errors++;
    } else {
      const activeEnv = fs.readFileSync(envPath, 'utf8');
      const missingKeys = exampleKeys.filter(key => !activeEnv.includes(key));
      if (missingKeys.length > 0) {
        console.error(`  ✗ Environment: Missing keys in .env: ${missingKeys.join(', ')}`);
        errors++;
      } else {
        console.log(`  ✓ Environment Variables: All ${exampleKeys.length} required keys present`);
      }
    }
  } else {
    console.log(`  - Environment: No .env.example file found (skipping key check)`);
  }

  // 3. Database & Storage Directory Audit
  const dataDir = path.resolve(process.cwd(), 'data');
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const testFile = path.join(dataDir, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log(`  ✓ Storage: 'data/' directory exists and is writable`);
  } catch (err) {
    console.error(`  ✗ Storage: Failed to write to 'data/' directory: ${err.message}`);
    errors++;
  }

  console.log('\n----------------------------------------------------');
  if (errors > 0) {
    console.error(`[DOCTOR] Status: FAILED with ${errors} error(s). Fix listed items before starting.\n`);
    process.exit(1);
  } else {
    console.log(`[DOCTOR] Status: 100% HEALTHY — Safe to launch via 'npm run start'\n`);
    process.exit(0);
  }
}

if (require.main === module) {
  runDoctor();
}

module.exports = { runDoctor };
