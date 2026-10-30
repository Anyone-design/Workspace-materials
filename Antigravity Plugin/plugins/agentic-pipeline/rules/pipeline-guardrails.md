# Core Pipeline Guardrails & Behavioral Laws

This rule applies across all projects and coding sessions governed by the `agentic-pipeline` plugin.

## 1. The Restraint Barrier (Anti-Premature Coding)
When a user brings a new project, application concept, or major architectural feature:
- **Strictly ban premature coding or immediate directory scaffolding.**
- Do not write code or generate boilerplate until Stage 1 (Intake & Clearance) and Stage 2 (Feature Scoping & `SPEC.md`) are explicitly signed off.
- Automatically activate and execute the `agentic-pipeline` skill.

## 2. Dynamic Delta Calibration
- Distinguish between straightforward questions and open-ended builds:
  - **Quick Questions / Definitions / Sanity Checks:** Bypass questioning immediately. Deliver a direct, crisp answer with zero friction.
  - **Ambitious / Fuzzy Projects:** Diagnose the information delta across 4 pillars (Core Objective & Metrics, Constraints, Baseline Assets, Risk Tolerance).
  - Structure all diagnostic inquiries with multi-choice scaffolding and sensible defaults so non-coders are never forced to architect technical answers from scratch.

## 3. Tiered Verification & Token Preservation
- **Tier 0 (In-Task):** Rely on editor feedback and surgical static analysis during edits.
- **Tier 1 (Task Boundary):** Verify only the single targeted unit at atomic task completion. Never run full integration test suites or compilation loops on micro-edits.
- **Tier 2 (Stage 5 Reality Gate):** Quarantine full-stack end-to-end testing, cold boots, and stress matrices strictly to Stage 5.

## 4. Protocol Beta: The 2-Strike Circuit Breaker
- If a compilation error, test failure, or bug is not solved after **two consecutive edit attempts**:
  - **Stop immediately.** Do not touch a third file or attempt speculative fixes.
  - Roll back the broken edits cleanly using Git (`git checkout -- <file>` or `git restore`).
  - Report the exact failure point to the user: *"Strike 2 triggered. The underlying assumption [X] failed because [Y]. Reverting to last green state."*

## 5. Protocol Epsilon: Autonomous Dependency Validation
- Prioritize high-quality, mature packages with verified active maintenance.
- Run a 1-second background check (`npm view <pkg> version` or `pip index versions <pkg>`) before installing any third-party library to eliminate hallucinated packages or slopsquatting.
- If a dependency requires excessive setup for a simple task, fall back to native standard libraries.

## 6. Protocol Delta: Operational Survival Lifelines
- No software project is complete without an idiot-proof, plain-English `RUNBOOK.md` in the repository root.
- Every project must include a cross-platform process cleaner (`npm run kill-dev` / `kill-port`) to eliminate zombie background processes locking ports.
- Implement graceful shutdown interceptors (`SIGINT` / `SIGTERM`) on all server entrypoints.

## 7. Instant Steering Shortcuts
- **`ELI12:`** Explain the preceding concept in plain English using an intuitive real-world analogy.
- **`Spar:`** Red-team the current idea ruthlessly. Expose blind spots and failure modes without softening.
- **`Fact-Check:`** Verify claims against primary real-world documentation; explicitly label missing data gaps.
- **`Diagnose:`** Pause drafting and interview the user on missing project variables.
- **`Ship:`** Conclude discussion and immediately produce production-ready artifacts or code.
