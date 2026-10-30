# Stage 5: Live Contract Convergence & Full-Stack Stress Audit

> **Primary Mission:** Wire the decoupled frontend to the live backend and subject the full system to real-world chaos to eliminate the "works on my machine" syndrome.  
> **Mandatory Handoff Artifact:** `Integration Audit Log`  
> **Exit Gate:** Adapter flipped to live API; 4-Vector Stress Matrix passes without synthetic mocks.

---

## 1. The Zero-Mock Reality Gate

Synthetic stubs and in-memory databases are strictly forbidden in Stage 5:
- Connect the application to the real local database file or test database instance.
- Launch the actual backend API process and real frontend runtime.
- Transmit real HTTP/WebSocket payloads end-to-end.

---

## 2. The Adapter Flip (Mock to Live)

In Stage 4, the frontend operated against `mock-adapter.js`. 
Stage 5 executes the **Adapter Flip**:
1. Update `src/client/api/client.js` configuration: set `USE_MOCK = false` (or configure live API endpoint).
2. Verify that every client request reaches the live backend routes and receives valid data from the database.
3. If payload field mismatches occur, resolve them against the Phase 0 Contract before proceeding.

---

## 3. The 4-Vector Stress Matrix (Decoupled Edition)

Every full-stack application must clear all 4 vectors before advancing to Stage 6:

```text
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│ Vector 1: Cold Boot Audit            │  │ Vector 2: Empty State & Payload Edge │
│ - Wipe caches & temp databases.      │  │ - Boot with empty database (0 rows). │
│ - Boot backend and frontend cold.    │  │ - Frontend displays clean empty      │
│ - Both processes live in < 5 seconds.│  │   state without undefined.map crash. │
└──────────────────┬───────────────────┘  └──────────────────┬───────────────────┘
                   │                                         │
                   └────────────────────┬────────────────────┘
                                        │
                   ┌────────────────────┴────────────────────┐
                   │                                         │
┌──────────────────▼───────────────────┐  ┌──────────────────▼───────────────────┐
│ Vector 3: Network Chaos, CORS & 429  │  │ Vector 4: Graceful Exit & Port Clear │
│ - Verify CORS headers between ports. │  │ - Send SIGINT (Ctrl + C) to runner.  │
│ - Inject invalid auth & offline net. │  │ - DB handles close; sockets drain.   │
│ - UI displays user-friendly toast;   │  │ - Both frontend & backend ports      │
│   zero console crash loops.          │  │   released in < 1 second.            │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

### Detailed Vector Checks:
1. **Vector 1 (Cold Boot):**
   - Run from cold terminal. Ensure no race condition where frontend boots before backend is ready to accept requests.
2. **Vector 2 (Empty & Edge States):**
   - Populate database with null values, long strings, and zero records. Verify UI renders empty state components cleanly.
3. **Vector 3 (Network Chaos & CORS):**
   - Test cross-origin requests between client (e.g. port 5173) and server (e.g. port 3000). Ensure proper CORS headers.
   - Inject simulated 429 (Too Many Requests) or 500 error; confirm client handles error gracefully without white-screening.
4. **Vector 4 (Graceful Exit & Port Cleanup):**
   - Interrupt running processes with `Ctrl+C`. Confirm neither frontend nor backend remains as an orphaned background zombie locking ports.

---

## 4. Mandatory Stage 5 Handoff Schema: `Integration Audit Log`

```markdown
# [Project Name] — Integration Audit Log
> **Date:** [YYYY-MM-DD] | **Environment:** [OS, Node/Python runtime]
> **Verdict:** PASSED — Cleared for Stage 6

## 1. Adapter Convergence
- [x] Mock adapter disabled; live API client activated.
- [x] Shared contract payloads match live backend responses (0 schema discrepancies).

## 2. 4-Vector Stress Matrix Results
- [x] **Vector 1 (Cold Boot):** Backend and Frontend cold booted in [X]ms. `/health` returned 200.
- [x] **Vector 2 (Empty State):** Rendered clean empty state on 0 records without null reference exceptions.
- [x] **Vector 3 (Network Chaos & CORS):** Verified CORS between ports. Injected 429 response; UI displayed non-blocking warning toast.
- [x] **Vector 4 (Graceful Exit):** Transmitted SIGINT. Ports [3000, 5173] released immediately; zero zombie background processes.

## 3. Integration Sign-Off
- **Handoff Decision:** Approved to proceed to Stage 6 (Polish, Deployment & Operations).
```
