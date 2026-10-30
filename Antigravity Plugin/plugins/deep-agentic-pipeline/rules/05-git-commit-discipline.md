# Ironclad Version Control & Commit Protocol

> **Scope:** Global Invariant Rule  
> **Status:** Strictly Enforced Across All Git Operations  

---

To eliminate code regressions, secret leaks, and lost progress, git operations are governed by four invariant laws:

### 1. The Two Commit Tiers

#### Tier 1: Atomic Task Micro-Commits
- **When Authored:** Immediately after *every single slice* in `ROADMAP.md` passes its Pre-Flight Binary Test Contract and receives unanimous `LGTM` from `code-auditor`.
- **Scope Limit:** Strictly $\le 3$ files and $\le 150$ lines of changed code.
- **Message Format:** Follows Conventional Commits 1.0:
  ```bash
  git commit -m "feat(client): implement results table view (Task 1.2)"
  ```

#### Tier 2: Airlocked Stage Gate Commits
- **When Authored:** At macro stage transitions when the stage exit deliverable (`CLEARANCE.md`, `SPEC.md`, `ROADMAP.md`, `AUDIT.md`, `RUNBOOK.md`) is signed off.
- **Message Format:**
  ```bash
  git commit -m "chore(pipeline): complete Stage 2 scoping and lock contracts (Gate 2)"
  ```

### 2. The Surgical Staging Law (AP-003)
- Bulk staging (`git add .`, `git add -A`) is **strictly forbidden**.
- Staging must be surgical and file-specific:
  ```bash
  git add src/client/app.js src/client/components/table.js
  ```
- Prevents accidental inclusion of `.env`, `.sqlite` database files, logs, or unreviewed files.

### 3. The "Never Commit Red" Law
- Code must never be committed if tests are failing, linters report syntax errors, or compiler checks fail.
- Every commit represents a provably green, working state.

### 4. Clean Working Tree Invariant
- Before advancing from Stage $N$ to Stage $N+1$, the working tree must be completely clean (`git status --porcelain` returns zero lines).
