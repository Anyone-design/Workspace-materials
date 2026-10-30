# Stage 2: Product Scoping & Contract Definition Engine

> **Assigned Leads:**  
> • `moat-guardian` (Principal Product Architect — Ryan Singer *Shape Up*, Marty Cagan *Inspired*)  
> • `contract-modeler` (Lead Systems Contract Modeler — OpenAPI 3.1, JSON Schema, Stripe API Standards)  
> **Mandatory Exit Gate:** Signed-off `SPEC.md` + `.pipeline/session-[ID]/contracts.json`

---

## 1. The "Rule of One" Closed Loop

Every Version 1.0 scope is restricted to **exactly one closed loop**:
$$\text{Single Loop} = \text{Trigger} \longrightarrow \text{Core Action} \longrightarrow \text{Reward / Output}$$

### The 5 Mandatory State Transitions
Map the behavior of the single loop across all 5 states:
1. **Idle / Empty State:** Initial view before user initiates action (illustrations, guidance, sample inputs).
2. **Trigger / In-Flight State:** Visual response immediately upon trigger (disabled buttons, skeleton loaders, progress bars).
3. **Success / Reward State:** The output rendered or generated (data table rows, exported file, status badge).
4. **Degraded / Partial State:** Handling partial success (e.g. 8 of 10 items processed successfully).
5. **Error / Recovery State:** Actionable, human-friendly recovery path (retry button, clear error message).

---

## 2. 3-Bucket Feature Triage & The Scope Creep Deflector

Categorize every proposed feature into one of three strict buckets:
- **Bucket 1: The v1 Moat:** Non-negotiable core loop required for minimal value demonstration.
- **Bucket 2: Fast-Follows (v1.1 Backlog):** Desirable additions (CSV exports, advanced filters, custom themes) quarantined to prevent delivery delay.
- **Bucket 3: Out-of-Scope Blacklist:** Explicitly banned in v1 (multi-tenant auth, billing subscriptions, cloud sync).

### The 3-Step Scope Deflector Script
When secondary features are proposed mid-flight:
1. **Acknowledge Value:** *"That is a valuable feature that users will definitely want..."*
2. **Quantify the Friction:** *"...however, introducing it now adds [N] extra files and [X] hours before the core engine is proven."*
3. **Quarantine to Backlog:** *"Let's record it in Bucket 2 of `SPEC.md`, ship the v1 core today, and tackle it in v1.1."*

---

## 3. Phase 0 Contract & Mock Fixtures (`contracts.json`)

Before any frontend or backend code is written, freeze the data contracts in `.pipeline/session-[ID]/contracts.json`:
- Define exact entity field names, types, validation rules, and formats.
- Define API endpoint routes, HTTP verbs, required payloads, and status codes.
- Embed **realistic mock fixtures** directly into the contract.

*Benefit:* Stage 4A can immediately build and preview the UI against `mock-adapter.js` returning these exact fixtures, achieving complete frontend/backend decoupling.

---

## 4. Exit Deliverable: `SPEC.md`

Use the standardized template in `../templates/SPEC.template.md`. Stage 2 is complete when `SPEC.md` and `contracts.json` are committed and signed off.
