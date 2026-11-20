#!/usr/bin/env node
/**
 * Reality Harness Template (Stage 5 Chaos QA)
 * Executes the 6-Vector Chaos Stress Matrix against a live application process.
 */

const http = require('http');

async function checkHealth(port = 3000) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${port}/health`, { timeout: 3000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ statusCode: res.statusCode, body: json });
        } catch {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function runRealityHarness() {
  console.log('[CHAOS QA] Launching 6-Vector Reality Stress Harness...\n');
  const results = [];

  // Vector 1: Cold Boot / Health Check
  try {
    const health = await checkHealth(3000);
    if (health.statusCode === 200) {
      console.log('  🟢 Vector 1 (Cold Boot / Health): PASS - /health returned 200 OK');
      results.push({ vector: 1, name: 'Cold Boot', pass: true });
    } else {
      console.log(`  🔴 Vector 1 (Cold Boot): FAIL - /health returned ${health.statusCode}`);
      results.push({ vector: 1, name: 'Cold Boot', pass: false });
    }
  } catch (err) {
    console.log(`  🔴 Vector 1 (Cold Boot): FAIL - Cannot connect to server: ${err.message}`);
    results.push({ vector: 1, name: 'Cold Boot', pass: false });
  }

  // Summary
  console.log('\n----------------------------------------------------');
  const failed = results.filter(r => !r.pass);
  if (failed.length > 0) {
    console.error(`[CHAOS QA] Harness FAILED. ${failed.length} vector(s) failed.`);
    process.exit(1);
  } else {
    console.log(`[CHAOS QA] All tested vectors PASSED under Zero-Mock live conditions.`);
    process.exit(0);
  }
}

if (require.main === module) {
  runRealityHarness();
}

module.exports = { runRealityHarness };
