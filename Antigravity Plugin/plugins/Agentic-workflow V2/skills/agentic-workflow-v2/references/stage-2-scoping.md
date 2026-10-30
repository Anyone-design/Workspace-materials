# Stage 2: Feature Scoping & Interface Contract Definition

> **Primary Mission:** Isolate the v1 core loop, freeze scope creep, and define research-backed data contracts.  
> **Mandatory Handoff Artifact:** `SPEC.md`  
> **Exit Gate:** Single core loop locked; Out-of-Scope blacklist committed; entity schemas grounded in empirical data.

---

## 1. The "Rule of One" (The v1 Moat)

Every version 1.0 build must execute **exactly one closed loop**:

$$\text{Trigger} \longrightarrow \text{Core Action} \longrightarrow \text{Reward / Output}$$

- **Trigger:** How work initiates (user clicks a button, runs a command, or fires a webhook).
- **Core Action:** The primary transformation (data parsed, AI model invoked, file processed).
- **Reward / Output:** Immediate tangible value delivered (CSV saved, dashboard card updated, notification sent).

If an idea requires two separate triggers or distinct outputs, it is two different products. Split them immediately.

---

## 2. The 3-Bucket Feature Triage

Categorize all proposed features into one of three strict buckets:

1. **Bucket 1: The v1 Moat (Non-Negotiable Core):**
   - Features without which the single core loop cannot function at all.
   - Everything in Bucket 1 must be implemented in v1.
2. **Bucket 2: Fast-Follows (v1.1 Queue):**
   - Great features (dark mode, CSV export, advanced search filters, sorting).
   - Parked visibly in `SPEC.md` so the user knows they are not forgotten, but deferred until v1 is proven and stable.
3. **Bucket 3: Out-of-Scope Blacklist:**
   - Features strictly prohibited in v1 (User auth/multi-tenancy, Stripe billing, role permissions, custom plugins).
   - Prevents the **Hydra Feature Trap** from bloating context windows and codebases.

---

## 3. The Scope Creep Shield (Pushback Protocol)

When the user requests secondary features during scoping:
1. **Validate Intent:** Acknowledge why the feature has long-term value.
2. **Expose the Cost:** Quantify the engineering overhead, cognitive load, and bug risk.
3. **Quarantine to v1.1:** Add it immediately to the Fast-Follows table in `SPEC.md`.

---

## 4. Empirical Schema Research (Research Rule Application)

Do not guess data structures out of thin air:
- Use official API specifications, database documentation, or sample payloads to verify data types, mandatory keys, and platform rate limits.
- Flag any field whose source is unknown or unverified.

---

## 5. Interface Contract Boundary (Preparing for Decoupling)

Stage 2 must explicitly document the data contracts that will allow Frontend and Backend to be built separately in Stages 3 and 4:
- Name the core entities.
- Define fields, data types, and nullability.
- Detail the exact payload returned by the core loop.

---

## 6. Mandatory Stage 2 Handoff Schema: `SPEC.md`

```markdown
# [Project Name] — System Specification (`SPEC.md`)
> **Status:** Locked & Approved | **Target Version:** 1.0

## 1. The Core Loop (v1 Moat)
- **Trigger:** [Exact trigger mechanism]
- **Core Action:** [Transformation executed]
- **Reward / Output:** [Concrete output produced]

## 2. Essential User Stories (Max 3)
1. As a [user], I want [capability] so that [benefit].
2. As a [user], I want [capability] so that [benefit].
3. As a [user], I want [capability] so that [benefit].

## 3. Data Entities & Contract Schemas
| Entity | Field | Type | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `Item` | `id` | String (UUID) | Yes | Unique identifier |
| `Item` | `title` | String | Yes | Display title |
| `Item` | `status` | Enum (active/archived)| Yes | Current lifecycle state |

## 4. Feature Triage
### A. The v1 Moat (In Scope)
- [x] [Core feature 1]
- [x] [Core feature 2]

### B. Fast-Follows (v1.1 Backlog)
- [ ] [Secondary feature 1 - e.g., CSV export]
- [ ] [Secondary feature 2 - e.g., Filter by date]

### C. Out-of-Scope Blacklist (Strictly Banned in v1)
- [ ] User authentication / Login screens
- [ ] Payment gateway / Stripe integration
- [ ] Multi-team workspaces / RBAC

## 5. Sign-Off & Handoff Gate
- **Verdict:** Locked & Approved -> Proceed to Stage 3 (Architecture & Slicing).
```
