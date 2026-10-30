# Stage 3: Decoupled Systems Architecture & DAG Task Slicing Engine

> **Assigned Leads:**  
> • `systems-architect` (Principal Enterprise Architect — Clean Architecture, Ports & Adapters, 12-Factor App)  
> • `dag-slicer` (DAG Task Slicing Specialist — Dependency Graphs, Domain-Driven Slicing)  
> **Mandatory Exit Gate:** Approved `ROADMAP.md` in root with DAG Mermaid diagram and Pre-Flight Test Contracts

---

## 1. Decoupled Directory Archetype (Archetype B Standard)

Adhere strictly to canonical decoupled full-stack architecture:

```text
my-project/
├── .env.example                  # Documented environment template
├── .gitignore                    # Secrets, node_modules, build outputs, db files
├── package.json                  # Root scripts & dependencies
├── public/                       # Static assets, favicon, icons
├── src/
│   ├── client/                   # TRACK A: FRONTEND DOMAIN
│   │   ├── index.html            # Semantic HTML entrypoint
│   │   ├── styles/
│   │   │   ├── tokens.css        # Extracted HSL variables & design tokens
│   │   │   └── main.css          # Global layout & utility styling
│   │   ├── components/           # Modular UI views & widgets
│   │   ├── state/                # Client state stores & event handlers
│   │   └── api/
│   │       ├── mock-adapter.js   # Mock fixtures adapter (Stage 4A preview)
│   │       └── live-client.js    # Live fetch client (Stage 5 convergence)
│   ├── server/                   # TRACK B: BACKEND DOMAIN
│   │   ├── app.js                # Server entrypoint & middleware mount
│   │   ├── routes/               # API endpoint route handlers
│   │   ├── controllers/          # Business logic & request validation
│   │   └── db/                   # DB schema, migrations, connection client
│   └── shared/                   # CONTRACT ANCHOR
│       └── contracts.json        # Single source of truth (from Stage 2)
```

### The Hexagonal Boundary Law
Core domain logic must never import raw database drivers or third-party HTTP clients directly. All external IO must sit behind repository or adapter interfaces.

---

## 2. The 6 Slicing Laws for `ROADMAP.md`

Every roadmap task must satisfy the **6 Slicing Laws**:
1. **The 15–30 Minute Atomic Boundary:** No task may tackle more than 30 minutes of implementation.
2. **The 3-File Ceiling:** A task may modify or create at most **3 files**. If a 4th file is touched, the task is too large and must be split.
3. **Binary Verification Gate:** Every task concludes with an automated pass/fail assertion (e.g. `node src/client/api/test-mock.js` exits 0).
4. **Pre-Flight Test Contract:** The command, input, and expected output must be declared *before* writing code.
5. **Decoupled Track Phasing:**
   - `Phase 0: Contract Verification & Mock Setup`
   - `Phase 1: Track A — Frontend Implementation` (UI views, states, mock wiring)
   - `🛑 The Human Review Gate` (Visual browser preview & user sign-off)
   - `Phase 2: Track B — Backend Implementation` (DB tables, endpoints matching contract)
6. **Explicit Dependency DAG:** Every task declares its prerequisites (`DependsOn: [Task X.Y]`), preventing parallel race conditions.

---

## 3. Exit Deliverable: `ROADMAP.md`

Use the standardized template in `../templates/ROADMAP.template.md`. Stage 3 is complete when `ROADMAP.md` is approved by `dag-slicer` and committed to git.
