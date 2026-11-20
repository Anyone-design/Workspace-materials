#!/usr/bin/env node
/**
 * Cross-Platform Port Cleaner Script
 * Terminates orphaned processes holding specified ports (e.g. 3000, 5173).
 */

const { execSync } = require('child_process');

function killPort(port) {
  const isWindows = process.platform === 'win32';
  console.log(`[KILL-PORT] Inspecting port ${port}...`);

  try {
    if (isWindows) {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      const lines = output.split('\n').filter(Boolean);
      const pids = new Set();

      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5 && parts[1].endsWith(`:${port}`)) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') pids.add(pid);
        }
      }

      for (const pid of pids) {
        console.log(`  Terminating Windows PID ${pid} holding port ${port}...`);
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
          console.log(`  ✓ PID ${pid} terminated.`);
        } catch {}
      }
    } else {
      const pids = execSync(`lsof -ti :${port}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split('\n');
      for (const pid of pids) {
        if (pid) {
          console.log(`  Terminating Unix PID ${pid} holding port ${port}...`);
          try {
            execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
            console.log(`  ✓ PID ${pid} terminated.`);
          } catch {}
        }
      }
    }
    console.log(`[KILL-PORT] Port ${port} is now clear.\n`);
  } catch (err) {
    console.log(`[KILL-PORT] Port ${port} was not held by any active process.\n`);
  }
}

const ports = process.argv.slice(2).map(Number).filter(Boolean);
const targetPorts = ports.length > 0 ? ports : [3000, 5173, 8000];

console.log(`[KILL-PORT] Cleaning target ports: ${targetPorts.join(', ')}\n`);
for (const port of targetPorts) {
  killPort(port);
}
console.log('[KILL-PORT] Port cleanup complete.');
