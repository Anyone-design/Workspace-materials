# The Anti-Pattern Defense System (AP-001 – AP-008)

> **Scope:** Global Invariant Rule  
> **Status:** Strictly Enforced by `code-auditor` on Every Code Diff  

---

The `code-auditor` evaluates every git diff against these 8 non-negotiable industry anti-patterns:

### AP-001: Zero Mock Leakage
- **Violation:** Importing mock fixtures, synthetic test adapters, or fake data into production backend routes, database clients, or production builds.
- **Remediation:** Mocks reside exclusively in `src/client/api/mock-adapter.js` or dedicated `tests/` directories. Production server paths must only communicate with real repositories and data sources.

### AP-002: Zero Compiler Appeasement
- **Violation:** Using `@ts-ignore`, `@ts-nocheck`, `eslint-disable`, casting to `any`, or swallowing errors with empty `catch {}` blocks to bypass type or lint errors.
- **Remediation:** Fix the underlying interface mismatch, update type definitions, or add proper runtime type assertions.

### AP-003: Zero Blind Mass Staging
- **Violation:** Executing `git add .`, `git add -A`, or wildcard staging commands.
- **Remediation:** Stage only the specific files assigned to the active task slice: `git add <file1> <file2>`. Prevents accidental commits of `.env`, secrets, sqlite files, or stray debug logs.

### AP-004: Zero Multi-File Thrashing
- **Violation:** Modifying files outside the $\le 3$ files declared in the active slice of `ROADMAP.md` during error remediation.
- **Remediation:** Keep all adjustments inside assigned files. If external files must be modified, the slice is invalid and must be formally re-planned.

### AP-005: Zero Unhandled Async/Promises
- **Violation:** Calling asynchronous operations, database transactions, network fetch requests, or child processes without explicit `try/catch` wrapping or promise rejection handling.
- **Remediation:** Wrap every async call with localized error boundaries and contextual error messages.

### AP-006: Zero Unbounded Resource Sprawl
- **Violation:** Infinite loops, uncapped polling intervals, un-paginated database queries without `LIMIT` clauses, or event listeners mounted without unmount/cleanup handlers.
- **Remediation:** Enforce maximum retry counts, query `LIMIT` bounds (e.g. `LIMIT 50`), exponential backoff, and socket/listener teardown.

### AP-007: Zero Secret Baking
- **Violation:** Hardcoding API keys (`sk-`, `ghp_`), database passwords, JWT secrets, or absolute filesystem paths into source code or commit diffs.
- **Remediation:** Extract all credentials to `.env`, document keys in `.env.example`, and verify `.gitignore` blocks `.env*`.

### AP-008: Zero Narrative Comments
- **Violation:** Inserting conversational comments describing *what* trivial lines of code do (e.g. `// increment counter by 1`).
- **Remediation:** Delete obvious narrative comments. Retain only comments explaining non-obvious *why* domain logic, mathematical models, or upstream platform quirks.
