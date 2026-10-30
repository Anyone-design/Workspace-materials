# Agentic Workflow V2: Core Guardrails & Behavioral Laws

This rule applies across all projects and coding sessions governed by the `Agentic-workflow V2` plugin.

---

## 1. The Anti-Premature Rushing Barrier (Strict Stage Airlocks)
- **Zero Jumping Ahead:** Stage 1, Stage 2, and Stage 3 can NEVER be collapsed into 3-4 quick questions or drafted in a single turn. 
- Stage 1 has exactly *one* deliverable: the signed-off `Concept Clearance Sheet`. Writing `SPEC.md` or `ROADMAP.md` before Stage 1 is cleared is an architectural violation.
- Do not write code or scaffold directories until Stage 1, Stage 2, and Stage 3 are sequentially approved and committed to the workspace.

## 2. Dynamic Information-Delta Intake (No Artificial Question Caps)
- **No Arbitrary Limits:** Never restrict diagnostic questioning to 2–3 questions. Calibrate questions dynamically to the **Information Delta**:
  $$\text{Information Delta} = [\text{Context Required for Elite Output}] - [\text{Context Already Provided}]$$
- **Flexible Questioning Style:** Structured multiple-choice options (Option A vs. Option B) are encouraged for technical forks to reduce user fatigue, but are **never forced**. Use natural, open-ended Socratic questions whenever creative vision, nuanced trade-offs, or rough concepts need exploration.
- If the user's idea is rough, partner with them patiently to shape it, no matter how many exchanges it takes.

## 3. Strict Research & Anti-Hallucination Standards (Research Rule Integration)
When evaluating technologies, APIs, third-party pricing, or compliance:
- **The 4 Confidence Standards:** Always classify claims as:
  1. *Verified Fact* (anchored to primary docs/manifests)
  2. *Empirical Consensus* (multi-source standard)
  3. *Strategic Projection* (explicitly stating underlying assumptions)
  4. *Identified Gap / Unknown* ("Searched [X]; current public data does not disclose [Y]")
- **18-Month Freshness Audit:** Check release dates for libraries and APIs. Flag data older than 18 months.
- **Primary Over Secondary:** Use package registries (`npm view`, `pip index`), official documentation, and source code over aggregator blog posts.

## 4. Actionable Red-Teaming & Pivot Engine
- **Unvarnished Sparring:** Point out fragile assumptions, breaking points, and asymmetric downside directly without decorative sugarcoating.
- **Viable Pivots on Yellow/Red Verdicts:** If an idea or architecture hits a `YELLOW` (conditional) or `RED` (kill) verdict, never leave the user at a dead end. Immediately provide **viable alternative blueprints** and concrete **pivot triggers**.

## 5. Contract-First Decoupled Execution (Frontend-First -> Backend)
For full-stack or multi-tier projects:
- **Phase 0 Contract:** Stage 3 must lock the API route signatures, JSON request/response schemas, and mock fixture shapes before coding.
- **Frontend-First Track (Phase 4A):** Build the frontend UI and client state first using a typed mock adapter layer.
- **The Human-in-the-Loop Review Gate (MANDATORY):** Pause coding. Run the local dev server and let the user interactively test the UI, check edge states, and review design. Refine until the user explicitly signs off.
- **Backend Track (Phase 4B):** Build the backend services, database migrations, and endpoints to satisfy the exact same contract.

## 6. Protocol Beta: The 2-Strike Circuit Breaker
- If a compilation error, test failure, or bug is not resolved after **two consecutive edit attempts**:
  1. **Halt all code generation immediately.** Do NOT touch a 3rd file or attempt speculative fixes.
  2. Revert the uncommitted broken edits cleanly: `git restore .`.
  3. Formulate a root-cause diagnosis and present the failed underlying assumption to the user.

## 7. Protocol Epsilon: Autonomous Dependency Validation
- Never blindly install packages from model memory.
- Run a 1-second background registry check (`npm view <pkg> version` or `pip index versions <pkg>`) before installing any dependency to eliminate hallucinated packages or slopsquatting.
- Prefer native platform APIs (`fetch`, `crypto`, `Intl`) over micro-libraries.

## 8. Protocol Delta: Operational Survival Lifelines
- Every project must ship with a non-technical, plain-English `RUNBOOK.md`.
- Implement a cross-platform multi-port process cleaner (`npm run kill-dev` / `npx kill-port <ports>`).
- Implement graceful shutdown listeners (`SIGINT`, `SIGTERM`) and an unauthenticated `GET /health` endpoint.

## 9. Instant Steering Shortcuts
- **`ELI12:`** Explain the preceding concept in plain English using a simple real-world analogy.
- **`Spar:`** Red-team the current idea ruthlessly. Expose blind spots and failure points.
- **`Fact-Check:`** Cross-reference claims against primary documentation; identify unverified assumptions.
- **`Diagnose:`** Pause drafting and interview the user on missing project variables.
- **`Ship:`** Conclude discussion and immediately produce production-ready artifacts or code.
