# Stage 5: Full-Stack Reality Gate & Chaos Stress Audit Engine

> **Assigned Lead:** `chaos-qa-auditor` (Staff Quality & Chaos Engineer — Netflix Principles, Zero-Mock Philosophy)  
> **Mandatory Exit Gate:** Certified `AUDIT.md` passing all 6 Chaos Stress Vectors under live conditions

---

## 1. The Adapter Flip (Contract Convergence)

With Track A (Frontend) and Track B (Backend) independently proven against `contracts.json`:
1. Switch `src/client/api/index.js` from `mock-adapter.js` to `live-client.js`.
2. Execute an initial smoke request (`GET /health` or `GET /api/...`).
3. If payloads mismatch, `contracts.json` is the sole source of truth—identify which side drifted and align it.

---

## 2. The Zero-Mock Reality Gate

- **Absolute Rule:** Stage 5 strictly forbids synthetic test databases or mocked network stubs.
- All testing runs against the real local SQLite database file, the real server process, and live HTTP calls over local sockets.

---

## 3. The 6-Vector Chaos Stress Matrix

Every application must pass all 6 vectors:

| Vector | Stress Action | Expected Pass Criteria |
| :--- | :--- | :--- |
| **1. Cold Boot** | Clear caches, launch in fresh terminal via `npm run start`. | Server listens on designated port; `/health` returns 200 in $< 3$ seconds. |
| **2. Empty & Fuzz** | Boot against empty DB; submit empty strings & 10,000-character payload. | Renders clean empty state; rejects oversized input with 400 Bad Request; zero crashes. |
| **3. Network Chaos** | Simulate invalid API key or HTTP 429 rate limit. | Displays user-friendly error banner with retry countdown; triggers exponential backoff; does not crash process. |
| **4. Concurrency** | Fire 5 simultaneous POST requests. | All 5 requests resolve or queue cleanly; zero SQLite lock corruption (`SQLITE_BUSY`). |
| **5. Graceful Exit** | Send `SIGINT` (Ctrl+C) to server during active request. | Server drains active sockets in $< 1.5$s, flushes DB WAL locks, and exits with code 0. |
| **6. Secret Audit** | Scan HTTP responses, DOM, and bundle. | Zero API keys (`sk-`, `ghp_`), passwords, or absolute filesystem paths exposed in client payloads. |

---

## 4. Blast-Radius Remediation Protocol

If a vector fails:
1. Halt testing and capture stdout/stderr traces.
2. Check `contracts.json` for data drift.
3. Apply a surgical fix touching **at most 2 files**.
4. Re-run all 6 vectors to guarantee zero regressions.
5. If unresolved after 2 attempts, engage Protocol Beta (`git restore .`).

---

## 5. Exit Deliverable: `AUDIT.md`

Use the standardized template in `../templates/AUDIT.template.md`. Stage 5 is complete when `AUDIT.md` is certified and committed.
