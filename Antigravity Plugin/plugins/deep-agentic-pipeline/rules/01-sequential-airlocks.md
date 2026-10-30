# Law of Sequential Airlocks & Anti-Rushing Rules

> **Scope:** Global Invariant Rule  
> **Status:** Strictly Enforced Across All Stages  

---

## The Core Invariant

The software delivery lifecycle progresses through **strictly sequential, airlocked stages**:
$$\text{Stage 1} \longrightarrow \text{Stage 2} \longrightarrow \text{Stage 3} \longrightarrow \text{Stage 4} \longrightarrow \text{Stage 5} \longrightarrow \text{Stage 6}$$

### 1. The Anti-Rushing Prohibition
- An agent may **NEVER** draft, generate, or propose downstream artifacts ($N+1$) while the active stage ($N$) is incomplete or uncommitted.
- **Stage 1, 2, and 3 cannot be collapsed** into a superficial turn of 3–4 questions followed by an all-in-one scaffold.
- Rushing straight to code before contracts are frozen and architecture is sliced is an immediate violation of this law.

### 2. Stage Airlock Exit Criteria

| Transition | Required Artifact | Signed-Off Exit Condition |
| :--- | :--- | :--- |
| **Stage 1 $\rightarrow$ Stage 2** | `CLEARANCE.md` | Verdict GREEN or YELLOW with 2 Viable Pivot Blueprints signed by `strategy-inquisitor`. |
| **Stage 2 $\rightarrow$ Stage 3** | `SPEC.md` + `contracts.json` | "Rule of One" v1 Moat locked, 3-bucket triage signed, mock fixtures frozen by `moat-guardian`. |
| **Stage 3 $\rightarrow$ Stage 4** | `ROADMAP.md` | Selected archetype, $\le 3$ files / $\le 30$ mins DAG slices, binary pre-flight tests approved by `systems-architect`. |
| **Stage 4A $\rightarrow$ Stage 4B** | `frontend-signoff.md` | Frontend Track A complete, dev server tested in browser, **Human Review Gate signed by user**. |
| **Stage 4B $\rightarrow$ Stage 5** | All Task Diffs Committed | Backend Track B complete, all slices have unanimous `LGTM` on AP-001 – AP-008 from `code-auditor`. |
| **Stage 5 $\rightarrow$ Stage 6** | `AUDIT.md` | Adapter flipped, all 6 vectors of Chaos Stress Matrix pass (Zero synthetic mocks) signed by `chaos-qa-auditor`. |
| **Stage 6 $\rightarrow$ Done** | `RUNBOOK.md` | `npm run doctor` exits 0, `kill-dev` verified, `/health` ping active, plain-English runbook signed by `sre-specialist`. |

### 3. Violation Remediation
If an agent detects uncommitted changes or attempts to leap ahead:
1. Halt code generation immediately.
2. Revert to the boundary of the active stage.
3. Notify the operator of the incomplete airlock requirement.
