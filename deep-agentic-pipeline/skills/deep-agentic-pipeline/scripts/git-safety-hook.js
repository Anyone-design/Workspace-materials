#!/usr/bin/env node
/**
 * AP-003 Git Safety PreToolUse Hook
 * Intercepts run_command calls and blocks blind wildcard git staging
 * and automatic mass-staging commit flags (git commit -a / --all).
 */

const fs = require('fs');

function main() {
  let input = '';
  try {
    input = fs.readFileSync(0, 'utf8');
  } catch (e) {
    console.log(JSON.stringify({ decision: 'allow' }));
    return;
  }

  let payload;
  try {
    payload = JSON.parse(input);
  } catch (e) {
    console.log(JSON.stringify({ decision: 'allow' }));
    return;
  }

  const toolName = payload?.toolCall?.name || '';
  const commandLine = payload?.toolCall?.args?.CommandLine || payload?.toolCall?.args?.command || '';

  if (toolName === 'run_command' && commandLine) {
    const trimmed = commandLine.trim();

    // 1. Block blind wildcard staging: git add ., git add -A, git add --all, git add *, git add "."
    const isBlindStaging = /\bgit\s+add\s+(['"]?)(\.|\-A|\-\-all|\*)\1(\s|$|;|&|\|)/i.test(trimmed);

    // 2. Block bypass commit flags: git commit -a, git commit -am "...", git commit --all
    const isBypassCommit = /\bgit\s+commit\s+.*(-[a-zA-Z]*a|--all)(\s|$)/i.test(trimmed);

    if (isBlindStaging || isBypassCommit) {
      const reason = isBlindStaging
        ? "Violation of AP-003 (Zero Blind Mass Staging). Use surgical, file-specific staging: 'git add <file1> <file2>'."
        : "Violation of AP-003 (Bypass Commit Flag). Do not use 'git commit -a' or '--all'; stage individual files explicitly.";

      console.log(JSON.stringify({
        decision: 'deny',
        reason: reason
      }));
      return;
    }
  }

  console.log(JSON.stringify({ decision: 'allow' }));
}

main();
