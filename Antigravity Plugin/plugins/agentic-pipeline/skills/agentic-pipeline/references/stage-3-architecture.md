# Stage 3 Reference: System Architecture & Slicing

Stage 3 translates the locked `SPEC.md` into an unshakeable structural blueprint. Without strict architecture and atomic task slicing, agents write sprawling, monolithic files that quickly exceed token limits and become impossible to debug.

---

## 1. The 3 Archetype Directory Standards

Match the project to one of three standardized directory archetypes. Do not invent custom folder hierarchies from scratch.

### Archetype A: CLI Tool / Automation Script / Bot
```text
my-project/
├── .env.example
├── .gitignore
├── README.md
├── package.json (or pyproject.toml)
└── src/
    ├── main.js (or main.py)      # CLI Entrypoint & Argument Parser
    ├── services/                 # Core Business Logic & Scraping
    └── utils/                    # Shared Helper Functions
```

### Archetype B: Full-Stack Web Application
```text
my-project/
├── .env.example
├── .gitignore
├── index.html                   # Semantic HTML Entrypoint
├── index.css                    # Design Tokens & Core Styling
├── src/
│   ├── app.js                   # Application State & Orchestration
│   ├── components/              # Modular UI Components
│   └── api/                     # Fetch Clients & Backend Handlers
```

### Archetype C: API Service + Persistent Storage
```text
my-project/
├── .env.example
├── .gitignore
├── server.js                    # HTTP Server & Route Registration
├── src/
│   ├── routes/                  # API Endpoint Definitions
│   ├── controllers/             # Business Logic & Request Handlers
│   └── db/                      # Database Schema, Migrations & Client
```

---

## 2. Scaffolding Pre-Flight Checklist

Before writing any application code, execute this 3-minute pre-flight checklist:
- [ ] Initialize package manifest (`npm init -y` or `python -m venv .venv`).
- [ ] Create `.gitignore` containing: `.env*`, `node_modules/`, `__pycache__/`, `*.db`, `dist/`.
- [ ] Create `.env.example` with empty keys for required variables.
- [ ] Create target directory folders based on the selected archetype.

---

## 3. The 4 Slicing Laws for `ROADMAP.md`

Every development phase must be chopped into granular, bite-sized tasks obeying the **4 Slicing Laws**:

1. **The 15–30 Minute Atomic Boundary:** No single task should attempt more than 30 minutes of implementation.
2. **The 3-File Ceiling:** A single task may modify or create at most **3 files**. If a task requires touching 4+ files, split it into two sub-tasks.
3. **Binary Verification Gate:** Every task must conclude with an exact, non-subjective pass/fail check (e.g., `node src/db/test_conn.js` prints `Connected` and exits 0).
4. **Strict Linear Sequencing:** Tasks must be ordered so that foundations (storage/models) precede logic (controllers), which precedes UI/presentation.

---

## 4. Mandatory Handoff Artifact: `ROADMAP.md`

Stage 3 is complete **only** when `ROADMAP.md` is generated in the root and signed off:

```markdown
# [Project Name] — Execution Roadmap (`ROADMAP.md`)

> **Archetype:** Archetype B (Full-Stack Web App)  
> **Status:** Active | **Total Slices:** 4

---

## Phase 1: Storage & Core Engine

### Task 1.1: Database Schema & Client Initialization
- **Files Touched (Max 3):** `src/db/client.js`, `src/db/schema.sql`, `package.json`
- **Action:** Install SQLite driver, define `leads` table, and expose client connection.
- **Binary Verification:** Run `node src/db/client.js` -> Prints `Database connected` and exits 0.
- **Status:** [ ] Pending

### Task 1.2: Core Extraction Logic
- **Files Touched (Max 3):** `src/services/extractor.js`, `src/utils/parser.js`
- **Action:** Implement single-URL parsing and AI classification call.
- **Binary Verification:** Run `node src/services/extractor.js --test` -> Returns JSON extraction payload.
- **Status:** [ ] Pending

---

## Phase 2: Interface & State Binding

### Task 2.1: Semantic UI Scaffold & Styling
- **Files Touched (Max 3):** `index.html`, `index.css`
- **Action:** Render input form, action button, and results table layout.
- **Binary Verification:** Open browser at `index.html` -> Elements render with zero console errors.
- **Status:** [ ] Pending

### Task 2.2: Event Wiring & State Sync
- **Files Touched (Max 3):** `src/app.js`, `src/api/client.js`
- **Action:** Bind submit button to extractor service, render live rows in DOM.
- **Binary Verification:** Submit sample URL -> New row appears in DOM within 3 seconds.
- **Status:** [ ] Pending
```
