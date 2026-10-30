# Stage 5 Reference: Full-Stack Integration & Stress Audit

Stage 5 is the **Zero-Mock Reality Gate**. In Stage 4, code was verified in atomic slices; in Stage 5, the entire system is wired together end-to-end and audited against real-world chaos to eliminate the "works on my machine" syndrome.

---

## 1. The Zero-Mock Reality Gate

Synthetic mocks hide integration bugs (CORS issues, serialization errors, async timing mismatches).
- **The Law:** Stage 5 forbids synthetic mock databases or fake network adapters.
- Connect to the actual local database file, run the real server process, and fire real HTTP requests against real endpoints.

---

## 2. The 4-Vector Stress Matrix

Every project must execute and pass the **4-Vector Stress Matrix** before proceeding to deployment:

```text
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     Vector 1: Cold Boot         │   │     Vector 2: Empty States      │
│  - Kill all lingering tasks     │   │  - Boot with empty database     │
│  - Launch from cold terminal    │   │  - Verify no `.map()` crashes   │
│  - Must be alive in < 5 seconds │   │  - Test 10,000-character inputs │
└─────────────────────────────────┘   └─────────────────────────────────┘
                 ▲                                     ▲
                 │                                     │
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│   Vector 3: Network Chaos / 429 │   │    Vector 4: Graceful Exit      │
│  - Inject invalid API keys      │   │  - Send SIGINT (Ctrl + C)       │
│  - Verify graceful error toast  │   │  - Verify port 3000 released    │
│  - Zero unhandled crash loops   │   │  - Zero zombie PID locks        │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

### Detailed Vector Checks

| Vector | Audit Action | Expected Pass Criteria |
| :--- | :--- | :--- |
| **1. Cold Boot** | Clear caches, run `npm run start` in clean terminal. | Server starts, listens on port, and `/health` returns 200 within 5 seconds. |
| **2. Empty State** | Delete database file, visit UI or run CLI. | Renders clean "No records found" UI rather than throwing undefined errors. |
| **3. Network Chaos** | Temporarily modify API key to `invalid_key`. Trigger core action. | Displays clear error message: *"API authorization failed. Please check your .env"* rather than fatal crash. |
| **4. Graceful Exit** | Press `Ctrl + C` during idle or active connection. | Sockets drain, database closes, and terminal prompt returns immediately. |

---

## 3. Mandatory Handoff Artifact: `Integration Audit Log`

Stage 5 is complete **only** when the `Integration Audit Log` is recorded:

```markdown
# Integration Audit Log

> **Date:** [YYYY-MM-DD] | **Environment:** Local Node v20.x  
> **Verdict:** PASSED — Ready for Stage 6

---

## Stress Matrix Results

- [x] **Vector 1 (Cold Boot):** Booted in 1.4s. Port 3000 listening.
- [x] **Vector 2 (Empty States):** Clean empty table state displayed when `leads` count is 0.
- [x] **Vector 3 (Network Chaos):** Simulated 401 error intercepted cleanly; UI showed red error banner.
- [x] **Vector 4 (Graceful Exit):** Port 3000 released within 450ms of SIGINT. Zero zombie processes.

---

## Integration Sign-Off
- **Identified Latencies:** Average local latency 18ms.
- **Handoff Decision:** Approved to proceed to Stage 6 (Polish, Deployment & Operational Lifelines).
```
