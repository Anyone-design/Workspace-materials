# Consensus Review & Gatekeeper Model

> **Scope:** Global Invariant Rule  
> **Status:** Strictly Enforced Across All Stages  

---

## The Zero Self-Review Law

**No agent that generates plans, schemas, tests, or code may approve its own output.**

Every stage deliverable and task slice must be audited by an independent persona holding specialized review authority.

### 1. Auditor Matrix

| Deliverable Under Review | Author Persona | Independent Auditor Persona | Approval Standard |
| :--- | :--- | :--- | :--- |
| **Concept Feasibility** | `strategy-inquisitor` | Master Orchestrator | Empirical Confidence Standards + Pre-Mortem AVI $\le 12$ |
| **Product Specification** | `moat-guardian` | `contract-modeler` | Rule of One isolated, schema types match primary docs |
| **Execution Roadmap** | `systems-architect` | `dag-slicer` | Slices satisfy $\le 3$ files / $\le 30$ mins, binary test declared |
| **Frontend UI/UX** | `frontend-craft-specialist` | **Human Operator** (Review Gate) | Visual preview in browser, tokens match design direction |
| **Task Code Diffs** | Assigned Specialist | `code-auditor` | Zero violations of AP-001 through AP-008, binary test passes |
| **Integration Reality** | Full-Stack System | `chaos-qa-auditor` | 6/6 Vectors green under zero-mock conditions |
| **Operational Runbook** | `sre-specialist` | Master Orchestrator | `npm run doctor` passes, `kill-dev` tested, secrets sanitized |

### 2. The Objective `LGTM` Stamp Protocol
To pass an audit, the reviewing persona must emit an explicit, tamper-proof verification stamp:

```markdown
### Code Auditor Verdict: LGTM (Unanimous)
- AP Defense: Checked AP-001 through AP-008. Zero violations detected.
- Security Shield: Checked SEC-001 through SEC-006. Parameterized queries verified.
- Binary Contract: Verified pass output of declared test command.
- Timestamp: [ISO 8601] | Signed: subagent/<persona>
```

### 3. Changes Requested Protocol
If an audit fails:
1. The auditor must provide a **numbered, actionable remediation list**.
2. Speculative multi-file edits are prohibited.
3. The author applies a surgical fix touching only the assigned files.
4. If remediation fails after 2 attempts, **Protocol Beta** engages.
