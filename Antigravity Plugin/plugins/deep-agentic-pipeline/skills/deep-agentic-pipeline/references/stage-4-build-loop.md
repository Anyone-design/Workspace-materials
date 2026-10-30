# Stage 4: Decoupled Build Loop, Review Gates & Circuit Breakers

> **Assigned Leads:**  
> • `frontend-craft-specialist` (Track A UI/UX Engineer)  
> • `backend-systems-specialist` (Track B Distributed Systems Engineer)  
> • `code-auditor` (Adversarial Anti-Pattern Inspector)  
> **Mandatory Exit Gate:** All roadmap tasks complete, unanimous `LGTM` on each slice, and recorded Human Review Gate sign-off.

---

## 1. Kickoff: Visual Mockup Selection Gate

Before implementing Track A frontend styles:
1. **Generate Mockups:** Use `generate_image` to create 2 contrasting UI aesthetic directions:
   - **Pole A (High-Tech / Flagship):** Dark mode, subtle glassmorphism, accent glows, dense cards.
   - **Pole B (Minimal / Editorial):** Light/monochrome, high-density, crisp borders, Swiss typography.
2. **User Selection:** The user picks their preferred visual direction or requests a re-roll.
3. **Token Extraction:** The `frontend-craft-specialist` extracts HSL colors, border-radii, and shadows directly into `tokens.css`.

---

## 2. Track A Execution: Frontend Against Mock Adapters

- Implement components, layouts, and views strictly against `mock-adapter.js`.
- Execute Pre-Flight Binary Test Contracts.
- `code-auditor` evaluates each diff against AP-001 – AP-008.
- Author Tier 1 Atomic Micro-Commits upon `LGTM`.

---

## 3. 🛑 The Human-in-the-Loop Review Gate (MANDATORY PAUSE)

When Track A is complete:
1. **Boot Dev Server:** Start local dev server (`npm run dev`) and output the clickable link.
2. **Present Inspection Checklist:**
   - *Visual Aesthetics:* Does it match the selected mockup?
   - *State Transitions:* Inspect loading skeleton, empty state, error banner, and populated view.
   - *Interaction Feel:* Test button hovers, form focus, and responsiveness.
3. **Iterate on Polish:** Fix UI padding, colors, or copy immediately. Changing frontend styles and mock adapters now costs zero backend rework.
4. **Sign-Off Required:** The agent may **NEVER** proceed to Track B backend code without explicit user sign-off (*"UI looks great, proceed to backend"*).

---

## 4. Track B Execution: Backend Matching Contracts

- Implement database migrations, connection client, controllers, and routes to satisfy `contracts.json`.
- Enforce the **Backend Security Shield (SEC-001 – SEC-006)**.
- Every slice verified with its Pre-Flight Binary Test Contract and committed atomically.

---

## 5. Protocol Beta: 2-Strike Circuit Breaker

```text
[Task Fails Binary Test or Code Audit]
                 │
                 ▼
Strike 1: Apply ONE targeted surgical fix inside assigned files. Re-test.
                 │
           Fails Again?
                 │
                 ▼
Strike 2: CIRCUIT BREAKER ENGAGED.
       1. HALT all code generation immediately.
       2. Execute: git restore . (clean revert to last green commit).
       3. Triangulate Root Cause:
          - Type A (Syntax / Scope Error)
          - Type B (API Drift / SDK Mismatch)
          - Type C (Architectural Premise Flaw)
       4. Report unvarnished root cause to user and request direction.
```
