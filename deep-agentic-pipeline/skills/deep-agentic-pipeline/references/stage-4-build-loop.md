# Stage 4: Decoupled Build Loop, Review Gates & Circuit Breakers

> **Assigned Leads:**  
> • `frontend-craft-specialist` (Track A UI/UX Craft Engineer & Prototype Architect)  
> • `backend-systems-specialist` (Track B Distributed Systems Engineer)  
> • `code-auditor` (Adversarial Anti-Pattern Inspector)  
> **Mandatory Exit Gate:** All roadmap tasks complete, unanimous `LGTM` on each slice, and recorded Human Review Gate sign-off.

---

## 1. Kickoff: The Interactive Generative UI Prototype Gate

Before writing multi-file production components (`.tsx`, `.jsx`, `.vue`):
1. **Author Standalone Interactive Prototype Artifact:**  
   The `frontend-craft-specialist` creates a single-file interactive HTML prototype using modern CDN primitives:
   - **Styling:** Tailwind CSS CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
   - **Icons:** Lucide Icons CDN (`<script src="https://unpkg.com/lucide@latest"></script>`)
   - **Fonts:** Inter or Geist via Google Fonts / system typography.
2. **Apply the High-Craft Design Standard (Anti-Slop):**
   - **3-Layer Depth:** Dark canvas `bg-zinc-950`, card surfaces `bg-zinc-900/80` with `border-zinc-800/60`, elevated popovers `bg-zinc-800`.
   - **Typography Formula:** Headings with `tracking-tight` (`letter-spacing: -0.025em`), labels in $11\text{px}$ uppercase `tracking-wider`, body in $14\text{px}$ `leading-relaxed`.
   - **Zero Emoji UI:** Strict ban on emoji navigation; use clean Lucide SVG icons.
   - **Interactive State Toggles:** Provide tabs or toggle controls in the prototype to preview:
     - Populated View (realistic domain fixtures from `contracts.json`).
     - Empty State (clean icon, zero-data prompt, primary call-to-action).
     - Loading Skeleton (`animate-pulse bg-zinc-800/60`).
     - Error Alert Banner.
3. **🛑 The Human Review Gate (MANDATORY OPERATOR PAUSE):**
   - The agent presents the interactive prototype in chat as an Antigravity artifact.
   - The user clicks buttons, toggles states, inspects spacing, and reviews the color palette live.
   - Any visual adjustments (colors, button sizes, padding, copy) are iterated on the single artifact in seconds.
   - **The agent may NEVER proceed to production frontend or backend code without explicit user sign-off** (*"UI prototype approved, proceed to implementation"*).

---

## 2. Track A Execution: Production Frontend Matching the Approved Prototype

Once the prototype artifact is approved:
1. **1:1 Component Translation:**
   - **Next.js 15+ App Router:**  
     - Root layout: `src/app/layout.tsx` (Geist font, metadata, atmospheric background).
     - Views: `src/app/page.tsx` (Server Component shell).
     - Decomposed UI: `src/components/ui/` and feature components with exact Tailwind utility classes from the approved prototype.
   - **Vite / React:**  
     - Standard component decomposition in `src/client/components/` and `src/client/pages/`.
2. **Mock-Driven Decoupling:**
   - Components fetch from a typed mock client (e.g. `src/lib/api-client.ts`) returning fixtures from `contracts.json`.
   - The frontend boots and looks 100% production-complete with **zero active backend running**.
3. **Pre-Flight Binary Verification & Audit:**
   - Each slice verifies its binary contract (`npm run build` or component test passes).
   - `code-auditor` evaluates each diff against AP-001 through AP-009.
   - Commit atomically with Tier 1 Conventional Commits.

---

## 3. Track B Execution: Backend & Data Layer Matching Contracts

1. **Contract Adherence:**
   - Implement route handlers (`src/app/api/...`), Server Actions, or Express/Hono controllers strictly matching request/response schemas in `contracts.json`.
2. **Backend Security Shield (SEC-001 – SEC-006):**
   - 100% Parameterized queries.
   - Zero-trust input validation schemas (Zod).
   - Query `LIMIT` bounds and sanitized error envelopes.
3. **Connecting Track A to Track B:**
   - Flip the frontend API client adapter from mock mode to live network endpoints.
   - Every slice verified with its binary test contract and committed atomically.

*(Note: For Archetype 3 Headless API / CLI projects, Track A and the Human Visual Gate are bypassed, and implementation starts directly in Track B).*

---

## 4. Protocol Beta: 2-Strike Circuit Breaker

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
