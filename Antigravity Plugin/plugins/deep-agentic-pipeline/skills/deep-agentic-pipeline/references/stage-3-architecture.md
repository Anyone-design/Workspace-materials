# Stage 3: Decoupled Systems Architecture & DAG Task Slicing Engine

> **Assigned Leads:**  
> • `systems-architect` (Principal Enterprise Architect — Clean Architecture, Ports & Adapters, Next.js Architecture)  
> • `dag-slicer` (DAG Task Slicing Specialist — Dependency Graphs, Domain-Driven Slicing)  
> **Mandatory Exit Gate:** Approved `ROADMAP.md` in root with DAG Mermaid diagram, selected Archetype, and Pre-Flight Test Contracts

---

## 1. Project Archetype Selection

The `systems-architect` must explicitly declare which Archetype the repository follows:

### Archetype 1 (Flagship Full-Stack): Next.js 15+ App Router
*Best for: Modern web applications, dashboards, SaaS tools, AI applications with UI.*
```text
my-project/
├── .env.example                     # Documented environment template
├── .gitignore                       # node_modules, .next, .env*, *.db
├── package.json                     # Next.js, React 19, Tailwind CSS, Lucide React
├── tsconfig.json                    # Strict TypeScript configuration
├── public/                          # Static assets, svg logos, favicon
├── src/
│   ├── app/                         # APP ROUTER DOMAIN
│   │   ├── layout.tsx               # Root layout shell (fonts, theming, metadata)
│   │   ├── page.tsx                 # Main view / dashboard server component
│   │   ├── api/                     # Route Handlers (Track B backend endpoints)
│   │   └── globals.css              # Tailwind CSS directives & layer overrides
│   ├── components/                  # REUSABLE COMPONENT DOMAIN
│   │   ├── ui/                      # Primitive widgets (buttons, cards, badges)
│   │   └── dashboard/               # Feature views matching approved prototype
│   ├── lib/                         # SHARED UTILITIES & ADAPTERS
│   │   ├── api-client.ts            # Typed client (mock adapter in 4A, live in 4B)
│   │   ├── db.ts                    # Database client (Prisma/Drizzle/Kysely)
│   │   └── contracts.json           # Frozen contract schemas (from Stage 2)
│   └── tests/                       # Test suites & reality harness
```

### Archetype 2: Decoupled Vite SPA + Modular API
*Best for: Lightweight micro-apps, internal utilities, client-only single-page apps.*
```text
my-project/
├── src/
│   ├── client/                      # TRACK A: FRONTEND DOMAIN (Vite/React)
│   ├── server/                      # TRACK B: BACKEND DOMAIN (Express/Hono)
│   └── shared/                      # CONTRACT ANCHOR (contracts.json)
```

### Archetype 3: Headless API, Python AI / CLI Service
*Best for: CLI tools, background workers, Python AI/RAG microservices, bots.*
*Execution rule: Explicitly bypasses Track A and the Human Visual Gate, routing directly to the core domain track with integration tests.*

---

## 2. The 6 Slicing Laws for `ROADMAP.md`

Every roadmap task must satisfy the **6 Slicing Laws**:
1. **The 15–30 Minute Atomic Boundary:** No task may tackle more than 30 minutes of implementation.
2. **The 3-File Ceiling:** A task may modify or create at most **3 files**. If a 4th file is touched, the task is too large and must be split.
3. **Binary Verification Gate:** Every task concludes with an automated pass/fail assertion (e.g. `npm test` or `node scripts/verify-step.js` exits 0).
4. **Pre-Flight Test Contract:** The command, input, and expected output must be declared *before* writing code.
5. **Decoupled Track Phasing:**
   - `Phase 0: Contract Verification & Scaffolding`
   - `Phase 1: Track A — Generative UI Prototype & Frontend` (Archetypes 1 & 2 only)
   - `🛑 The Human Review Gate` (Interactive artifact inspection & user sign-off)
   - `Phase 2: Track B — Backend & Data Layer` (Endpoints, DB tables matching contract)
6. **Explicit Dependency DAG:** Every task declares its prerequisites (`DependsOn: [Task X.Y]`), preventing parallel race conditions.
