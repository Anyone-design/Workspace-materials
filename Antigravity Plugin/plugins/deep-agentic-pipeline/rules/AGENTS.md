# Deep Agentic Pipeline: Invariant Behavioral Rules & Governance Charter

This document defines the absolute, non-negotiable behavioral invariants for any AI agent executing within the `deep-agentic-pipeline` plugin. These rules eliminate "Vibe Coding" and enforce disciplined, deterministic Senior Agentic Engineering.

---

## 1. Core Operating Philosophy: Zero Vibe Coding

1. **Deterministic Over Exploratory:** Every production code change must stem from an approved roadmap slice, satisfy an explicit pre-flight binary test contract, and pass peer subagent review.
2. **Evidence Before Assertions:** An agent must NEVER claim a task is completed, a bug is fixed, or a test passes without executing the actual verification command and inspecting the output.
3. **No Autonomous Scope Creep:** Implement strictly what is specified in the active roadmap task slice. Do not refactor adjacent files or "tidy up" unrelated code unless explicitly scheduled.

---

## 2. The Law of Sequential Airlocks

The software engineering lifecycle progresses through strictly sequential, airlocked stages:
$$\text{Stage 1: Intake} \longrightarrow \text{Stage 2: Scoping} \longrightarrow \text{Stage 3: Architecture} \longrightarrow \text{Stage 4: Build Loop} \longrightarrow \text{Stage 5: Reality Gate} \longrightarrow \text{Stage 6: Operations}$$

1. **Anti-Rushing Prohibition:** An agent may NEVER draft downstream code or artifacts ($N+1$) while the active stage ($N$) is incomplete or uncommitted.
2. **Airlock Exit Criteria:**
   - **Stage 1 $\rightarrow$ Stage 2:** Signed `CLEARANCE.md` (Verdict GREEN or YELLOW with 2 Viable Pivot Blueprints and AVI $\le 12$).
   - **Stage 2 $\rightarrow$ Stage 3:** Signed `SPEC.md` + frozen `contracts.json` (Rule of One isolated, 5 state transitions mapped).
   - **Stage 3 $\rightarrow$ Stage 4:** Approved `ROADMAP.md` (Selected archetype, $\le 3$ files / $\le 30$ mins DAG slices, binary test contracts).
   - **Stage 4A $\rightarrow$ Stage 4B (Archetypes 1 & 2):** **🛑 The Human Review Gate**. Interactive HTML/Tailwind Generative UI Prototype inspected and approved by the human operator.
   - **Stage 4 $\rightarrow$ Stage 5:** All roadmap slices committed atomically with unanimous `LGTM` from `code-auditor`.
   - **Stage 5 $\rightarrow$ Stage 6:** Certified `AUDIT.md` (6/6 vectors of Chaos Stress Matrix passing under zero-mock conditions).
   - **Stage 6 $\rightarrow$ Ship:** Verified `RUNBOOK.md` (`npm run doctor` exits 0, `kill-dev` tested, `/health` route active).

---

## 3. The Zero Self-Review Law

**No agent that generates plans, schemas, tests, or code may approve its own output.**
- Task code diffs must be independently audited by `code-auditor`.
- System architectures and contracts must be audited before execution.
- A single `CHANGES_REQUESTED` verdict blocks progression. The author must apply a targeted, surgical fix restricted to the assigned files.

---

## 4. The Anti-Pattern Defense System (AP-001 through AP-009)

The `code-auditor` evaluates every git diff against these 9 non-negotiable anti-patterns:

### AP-001: Zero Mock Leakage
- **Violation:** Importing mock fixtures or synthetic adapters into production backend routes, database clients, or production builds.
- **Rule:** Mocks reside strictly in mock adapters (`src/lib/api-mock.ts`) or `tests/`. Production server paths communicate exclusively with real data sources.

### AP-002: Zero Compiler Appeasement Hacks
- **Violation:** Suppressing type checkers or linters via `@ts-ignore`, `@ts-nocheck`, `eslint-disable`, casting to `any`, or swallowing errors with empty `catch {}`.
- **Rule:** Fix the underlying interface mismatch, update type definitions, or add proper runtime type assertions.

### AP-003: Zero Blind Mass Staging
- **Violation:** Executing `git add .`, `git add -A`, `git add --all`, wildcard staging (`git add *`), or bypassing via `git commit -a`.
- **Rule:** Staging MUST be surgical and per-file: `git add path/to/file1.ts path/to/file2.ts`. Prevents accidental commits of `.env`, secrets, `.sqlite` files, or stray debug logs.

### AP-004: Zero Multi-File Thrashing
- **Violation:** Modifying files outside the $\le 3$ files declared in the active slice of `ROADMAP.md`.
- **Rule:** Keep all adjustments inside assigned files. If external files must be modified, the slice is invalid and must be formally re-planned.

### AP-005: Zero Unhandled Async / Promises
- **Violation:** Calling asynchronous operations, database transactions, network fetch requests, or child processes without explicit `try/catch` wrapping or promise rejection handling.
- **Rule:** Wrap every async call with localized error boundaries and contextual error messages.

### AP-006: Zero Unbounded Resource Sprawl
- **Violation:** Infinite loops, uncapped polling intervals, un-paginated queries without `LIMIT` clauses, or event listeners mounted without unmount cleanup.
- **Rule:** Enforce maximum retry counts, query `LIMIT` bounds (e.g. `LIMIT 50`), exponential backoff, and socket/listener teardown.

### AP-007: Zero Secret Baking
- **Violation:** Hardcoding API keys, database passwords, JWT secrets, or absolute filesystem paths into source code or commit diffs.
- **Rule:** Extract all credentials to `.env`, document keys in `.env.example`, and verify `.gitignore` blocks `.env*`.

### AP-008: Zero Narrative Comments
- **Violation:** Inserting conversational comments describing *what* trivial lines of code do (e.g. `// increment counter by 1`).
- **Rule:** Delete obvious narrative comments. Retain only comments explaining non-obvious *why* domain rationale, mathematical formulas, or upstream platform quirks.

### AP-009: Zero AI UI Slop (Objective High-Craft Standard)
- **Violation:** Using emojis as UI icons (📁, 📊, 🚀, ⚙️), flat 1-layer single-color backgrounds, unstyled native inputs, un-tokenized arbitrary inline styles, or non-responsive tables.
- **Rule:** 
  1. Emojis as UI icons are strictly prohibited. Every icon must be a clean, 16px/20px inline SVG (Lucide React / Heroicons).
  2. Frontends must implement the **3-Layer Surface Hierarchy** (Canvas, Card Surface, Elevated Surface) with atmospheric depth.
  3. Typography must enforce `tracking-tight` (`letter-spacing: -0.025em`) on headings and $14\text{px}$ body text with $1.5$–$1.6$ line-height.
  4. Every interactive component must handle Rest, Hover, Active, and Focus-Visible states.
  5. Every data view must handle Empty, Loading Skeleton, Populated, and Error states.

---

## 5. Backend Security Shield (SEC-001 – SEC-006)

1. **SEC-001: SQL Injection Immunization:** 100% Parameterized queries and prepared statements (`WHERE id = ?` or `$1`). Raw string concatenation in SQL queries is prohibited.
2. **SEC-002: Zero-Trust Input Validation:** Every incoming HTTP request body, query parameter, and route parameter must pass strict schema validation (Zod, Joi, or native assertions).
3. **SEC-003: Command Injection Immunization:** Untrusted inputs must never be passed to shell execution strings (`child_process.exec`). Use parameterized execution arrays (`execFile`, `spawn`) with `{ shell: false }`.
4. **SEC-004: Secret Quarantine & Log Sanitization:** Environment variables loaded via `.env` must never be logged to console/files or returned in error payloads.
5. **SEC-005: DoS & Resource Exhaustion Defense:** Database SELECT queries must declare explicit `LIMIT` clauses (e.g. `LIMIT 50`). Public endpoints must incorporate rate-limiting or bounded queues.
6. **SEC-006: Sanitized Error Envelopes:** Stack traces, internal database schema definitions, and system filepaths must never be exposed to clients in production HTTP responses.

---

## 6. Version Control & Git Commit Protocol

1. **Tier 1: Atomic Task Micro-Commits:**
   - Authored immediately after a roadmap slice passes its Pre-Flight Binary Test Contract and receives `LGTM` from `code-auditor`.
   - Strictly $\le 3$ files and $\le 150$ LOC.
   - Format: Conventional Commits standard (`feat(scope): ...`, `fix(scope): ...`).
2. **Tier 2: Airlocked Stage Gate Commits:**
   - Authored at macro stage transitions when exit deliverables are certified.
   - Format: `chore(pipeline): complete Stage X [gate]`.
3. **Clean Working Tree Invariant:** Before advancing to the next stage, `git status --porcelain` must return zero uncommitted lines.

---

## 7. Operating Modes & Fast Paths

- **Standard Mode (Default):** Full 6-stage lifecycle with multi-agent consensus and complete verification (for greenfield applications and major features).
- **/fast mode:** Single-task maintenance mode ($\le 3$ files, $\le 150$ LOC). Bypasses Stages 1–3 if contracts are unchanged. Requires binary test pass and single `code-auditor` review.
- **/trivial mode:** Chores, documentation, and configuration updates only. Skips audit, tests, and runbook gates. Single atomic commit.

