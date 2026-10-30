# Stage 3: Decoupled System Architecture & Task Slicing

> **Primary Mission:** Design a decoupled structural blueprint and slice execution into atomic, contract-first tasks.  
> **Mandatory Handoff Artifact:** `ROADMAP.md`  
> **Exit Gate:** Archetype selected, API/schema contracts locked in Phase 0, Frontend and Backend sequenced into distinct, verifiable slices ($\le 3$ files, $\le 30$ mins).

---

## 1. The Decoupled Architecture Paradigm

Building frontend and backend simultaneously causes context thrashing, API mismatch, and multi-file debugging spirals. 
Stage 3 enforces **Contract-First Architectural Decoupling**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 0: Contract & Schema Lock                                        │
│ - Exact API route definitions, payload shapes, and mock JSON fixtures. │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│ Track A: Frontend Architecture  │     │ Track B: Backend Architecture   │
│ - Component Hierarchy           │     │ - Database Schema & Migrations  │
│ - Design System & CSS Tokens    │     │ - Controller Handlers & Routes  │
│ - Client State & User Flows     │     │ - Core Business Logic Services  │
│ - Typed Mock API Adapter Layer  │     │ - Health Check & DB Connectors  │
└─────────────────────────────────┘     └─────────────────────────────────┘
```

---

## 2. Directory Archetypes

Select one of the canonical directory standards:

### Archetype A: CLI Tool / Script / Bot
```text
my-project/
├── .env.example
├── .gitignore
├── package.json
└── src/
    ├── main.js             # CLI Entrypoint & Argument Parser
    ├── services/           # Processing, Scraping & Business Logic
    └── utils/              # Helper Functions, DB Client & Formatters
```

### Archetype B: Decoupled Full-Stack Web Application
```text
my-project/
├── .env.example
├── .gitignore
├── package.json            # Root workspace or concurrent runner
├── public/                 # Static assets & icons
├── src/
│   ├── client/             # FRONTEND TRACK
│   │   ├── index.html      # Semantic HTML entrypoint
│   │   ├── styles/         # CSS tokens & design system
│   │   ├── components/     # UI components (views, cards, inputs)
│   │   ├── state/          # UI store & local state
│   │   └── api/            # API Client (Mock Adapter + Live Fetcher)
│   ├── server/             # BACKEND TRACK
│   │   ├── app.js          # Express / Fastify / HTTP server
│   │   ├── routes/         # Endpoint route handlers
│   │   ├── controllers/    # Request processing & validations
│   │   └── db/             # Schema, migrations & DB client
│   └── shared/             # SHARED CONTRACTS
│       └── contracts.json  # Shared schemas, types & mock fixtures
```

### Archetype C: API Service + Persistent DB
```text
my-project/
├── .env.example
├── .gitignore
├── server.js               # HTTP Server & Middleware Mount
└── src/
    ├── routes/             # Route Definitions
    ├── controllers/        # Request Handlers & Business Logic
    └── db/                 # DB Client, Schema & Migrations
```

---

## 3. The 4 Slicing Laws for `ROADMAP.md`

Every task in `ROADMAP.md` must strictly satisfy:

1. **The 15–30 Minute Boundary:** Maximum 30 minutes of implementation work.
2. **The 3-File Ceiling:** Modifies or creates at most **3 files**. If a 4th file is needed, split the task.
3. **Binary Verification Gate:** Concludes with an automated pass/fail verification check (e.g. `node src/client/api/test-mock.js` exits with code 0).
4. **Decoupled Linear Sequencing:** 
   - `Phase 0: Shared Contract & Mock Fixtures`
   - `Phase 1: Track A - Frontend Implementation` (UI, components, mock-driven interaction)
   - `🛑 The Human Review Gate` (Visual preview & user signoff)
   - `Phase 2: Track B - Backend Implementation` (DB setup, endpoints matching contract)

---

## 4. Scaffolding Pre-Flight Checklist

Before generating logic files:
- [ ] Initialize package manifest (`package.json` / `pyproject.toml`).
- [ ] Create `.gitignore` (`.env*`, `node_modules/`, `dist/`, `*.db`, `.DS_Store`).
- [ ] Create `.env.example` with blank keys and plain-English comments.
- [ ] Scaffolding directory tree according to chosen Archetype.

---

## 5. Mandatory Stage 3 Handoff Schema: `ROADMAP.md`

```markdown
# [Project Name] — Execution Roadmap (`ROADMAP.md`)
> **Archetype:** [Archetype A, B, or C] | **Status:** Active

## Phase 0: Contract & Mock Fixture Definition
### Task 0.1: Shared Schema & Mock Data Fixtures
- **Files Touched (Max 3):** `src/shared/contracts.json`, `src/client/api/mock-adapter.js`
- **Action:** Define endpoint routes, payload contracts, and realistic mock fixtures.
- **Binary Verification:** `node src/client/api/mock-adapter.js --verify` exits 0.
- **Status:** [ ] Pending

## Phase 1: Track A — Deep Frontend Implementation
### Task 1.1: Design System Tokens & Base Layout
- **Files Touched (Max 3):** `src/client/styles/index.css`, `src/client/index.html`
- **Action:** Scaffold CSS variables, typography, layout container, and reset styles.
- **Binary Verification:** Static DOM inspection passes without missing styles.
- **Status:** [ ] Pending

### Task 1.2: Core UI Components & Mock Adapter Wiring
- **Files Touched (Max 3):** `src/client/components/Feed.js`, `src/client/app.js`
- **Action:** Render main views populated by the mock adapter; wire interactive events.
- **Binary Verification:** `node src/client/components/Feed.test.js` or visual DOM render passes.
- **Status:** [ ] Pending

---
### 🛑 HUMAN REVIEW GATE
- **Trigger:** Frontend running on local dev server.
- **Requirement:** User interactively tests the UI, reviews layout, animations, error states, and signs off.
---

## Phase 2: Track B — Deep Backend Implementation
### Task 2.1: Database Client & Schema Migration
- **Files Touched (Max 3):** `src/server/db/client.js`, `src/server/db/schema.sql`
- **Action:** Initialize SQLite/Postgres connection, create tables matching `SPEC.md`.
- **Binary Verification:** `node src/server/db/client.js --test` initializes and exits 0.
- **Status:** [ ] Pending

### Task 2.2: API Route Handlers & Business Logic
- **Files Touched (Max 3):** `src/server/routes/api.js`, `src/server/controllers/main.js`, `src/server/app.js`
- **Action:** Implement routes to satisfy the exact contract defined in Phase 0.
- **Binary Verification:** `node src/server/routes/api.test.js` passes all contract assertions.
- **Status:** [ ] Pending
```
