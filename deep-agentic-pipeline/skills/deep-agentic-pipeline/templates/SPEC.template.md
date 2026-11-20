# [Project Name] — System Specification (`SPEC.md`)

> **Session ID:** [6-char SHA] | **Date:** [YYYY-MM-DD]  
> **Status:** LOCKED & APPROVED | **Target Version:** 1.0  
> **Lead Product Architect:** Subagent `moat-guardian`  
> **Lead Contract Modeler:** Subagent `contract-modeler`

---

## 1. The Core Loop (v1 Moat)
- **Trigger:** [Exact user input, CLI flag, or event trigger]
- **Core Action:** [Heavy transformation or computation engine]
- **Reward / Output:** [Immediate value rendered in UI or generated file]

---

## 2. Essential User Stories (Max 3)
1. **As an operator,** I want to [action] so that [outcome].
2. **As an operator,** I want to [action] so that [outcome].
3. **As an operator,** I want to [action] so that [outcome].

---

## 3. Mandatory State Transition Matrix
| State | UI Representation / Output | Trigger to Advance |
| :--- | :--- | :--- |
| **Idle / Empty** | Empty table illustration with "Run query" CTA | User enters parameters |
| **In-Flight** | Skeleton loader + disabled submit button | Background processing begins |
| **Success** | Populated table with row count badge | Data returned from API/Engine |
| **Degraded / Partial** | Partial table with warnings banner | Partial query resolution |
| **Error** | Red inline alert with retry button | Network error or invalid input |

---

## 4. Data Entities & API Contracts Reference
- **Contract Schema File:** `.pipeline/session-[ID]/contracts.json`
- **Locked Entities:** [e.g. `Record`, `Item`]
- **Locked Endpoints:** [e.g. `GET /api/items`, `POST /api/items`]

---

## 5. Feature Triage Ledger
### Bucket 1: The v1 Moat (Approved Core)
- [x] [Core feature 1]
- [x] [Core feature 2]

### Bucket 2: Fast-Follows (v1.1 Backlog)
- [ ] [Feature A — Priority High]
- [ ] [Feature B — Priority Medium]

### Bucket 3: Out-of-Scope Blacklist (Strictly Banned in v1)
- [ ] User authentication / Multi-user login
- [ ] Cloud sync / Third-party billing
- [ ] Custom theming / Multi-tenancy

---

## 6. Official Handoff Gate
- **Verdict:** Locked & Approved
- **Entry Ticket to Stage 3:** Committed to root `SPEC.md` and `.pipeline/session-[ID]/contracts.json`.
