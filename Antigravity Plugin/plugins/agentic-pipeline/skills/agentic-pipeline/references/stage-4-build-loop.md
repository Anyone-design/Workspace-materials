# Stage 4 Reference: Atomic Build Loop & Circuit Breaker

Stage 4 is the actual code production engine. It operates as a strict, single-task build loop designed to prevent "bug thrashes"—where an agent introduces a bug, edits 5 more files trying to fix it, and buries the codebase under compounded errors.

---

## 1. The Single-Task Atomic Execution Loop

For every task listed in `ROADMAP.md`, the agent strictly follows this 5-step sequence:

```mermaid
graph TD
    A[Step 1: Read Next Task from ROADMAP.md] --> B[Step 2: Surgical Edits strictly <= 3 files]
    B --> C[Step 3: Execute Tier 1 Binary Verification]
    C -->|Pass| D[Step 4: Git Commit Atomic Progress]
    D --> E[Step 5: Mark Task [x] in ROADMAP.md]
    C -->|Fail| F[Engage Circuit Breaker Protocol Beta]
```

---

## 2. Protocol Epsilon: Autonomous Dependency Validation

Never guess library names or install deprecated packages. Before running any install command:

1. **Autonomous Registry Verification:** Run a 1-second background check:
   ```bash
   npm view <package-name> version
   # OR: pip index versions <package-name>
   ```
2. **Quality & Maintenance Criteria:**
   - Package must be actively maintained (updated within the last 12–18 months).
   - Package must have significant weekly downloads or established maturity.
3. **The Native Fallback Standard:** If a package brings 50 nested dependencies for a simple task (e.g. date formatting or HTTP requests), use native language features (`fetch()`, `Intl.DateTimeFormat`) instead of third-party libraries.

---

## 3. Protocol Beta: The 2-Strike Circuit Breaker

When an atomic task fails its binary verification check, the agent is governed by the **2-Strike Circuit Breaker**:

```text
[Task Fails Binary Check]
       │
       ▼
Strike 1: Apply single surgical fix to the active files. Re-run verification.
       │
   Fails Again?
       │
       ▼
Strike 2: CIRCUIT BREAKER ENGAGED.
          1. Stop all editing immediately.
          2. Execute: git restore . (or git checkout -- <files>)
          3. Revert codebase to the last known clean commit.
          4. Report the underlying failed assumption directly to the user.
```

### The Circuit Breaker Pushback Script
> *"Strike 2 Triggered. Task 1.2 failed binary verification with error: `SQLITE_ERROR: no such table: leads`.  
> Rather than editing more files and risking state corruption, I have reverted all uncommitted changes back to our last green commit.  
> The core issue: Migration script was never executed before calling the database client. Should we add an automated migration step to Task 1.1?"*

---

## 4. Git Commit Hygiene

Every completed atomic task must produce an atomic Git commit immediately upon passing verification.

### Standardized Format
```bash
git add <file1> <file2>
git commit -m "feat(storage): initialize sqlite client and schema (Task 1.1)"
```

- **Never** commit broken or unverified code.
- **Never** run `git add .` without checking `git status` to ensure secrets (`.env`) are not accidentally staged.
