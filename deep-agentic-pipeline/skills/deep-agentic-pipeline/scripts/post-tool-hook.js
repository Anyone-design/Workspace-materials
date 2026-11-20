#!/usr/bin/env node
/**
 * Test Execution Audit PostToolUse Hook
 * Logs test execution command audits to the active project's session reviews.
 */

const fs = require('fs');
const path = require('path');

function main() {
  let input = '';
  try {
    input = fs.readFileSync(0, 'utf8');
  } catch (e) {
    console.log('{}');
    return;
  }

  let payload;
  try {
    payload = JSON.parse(input);
  } catch (e) {
    console.log('{}');
    return;
  }

  const commandLine = payload?.toolCall?.args?.CommandLine || payload?.toolCall?.args?.command || '';
  if (commandLine && /\btest\b/i.test(commandLine)) {
    try {
      // Resolve workspace root from payload, fallback to cwd only if unavailable
      const workspaceRoot = (payload.workspacePaths && payload.workspacePaths.length > 0)
        ? payload.workspacePaths[0]
        : process.cwd();

      const targetDir = path.resolve(workspaceRoot, '.pipeline', 'session-active', 'reviews');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const logFile = path.join(targetDir, `audit-${Date.now()}.log`);
      const logContent = `[TEST AUDIT] Step: ${payload.stepIdx || 0}\nCommand: ${commandLine}\nTimestamp: ${new Date().toISOString()}\n`;
      fs.writeFileSync(logFile, logContent, 'utf8');
    } catch (err) {
      // Non-blocking
    }
  }

  console.log('{}');
}

main();
