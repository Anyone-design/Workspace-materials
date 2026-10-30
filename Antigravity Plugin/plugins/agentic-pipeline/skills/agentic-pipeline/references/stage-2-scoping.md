# Stage 2 Reference: Feature Scoping & The v1 Moat

Stage 2 ruthlessly prunes feature creep before a single line of architecture is planned. The primary trap for vibe-coders is the **Hydra Feature Trap**: attempting to build user auth, multi-tenancy, analytics dashboards, and billing into version 1.0, causing the build to stall and collapse under its own weight.

---

## 1. The "Rule of One" (The v1 Moat)

Every version 1.0 software project must have **exactly one core loop**:

$$\text{Single Loop} = \text{Trigger} \longrightarrow \text{Core Action} \longrightarrow \text{Reward / Output}$$

- **Trigger:** How does the action start? (User pastes a URL, clicks a button, or a scheduled cron fires).
- **Core Action:** What heavy lifting does the system perform? (Scrapes the page, calls an LLM, processes a CSV).
- **Reward / Output:** What concrete value is delivered immediately? (A downloadable markdown report, a formatted table, a sent message).

If a proposed feature does not directly serve this single loop, it is disqualified from v1.

---

## 2. The 3-Bucket Feature Triage

When evaluating user requests during scoping, sort every feature into one of three buckets:

```text
┌────────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
│  Bucket 1: The v1 Moat │   │ Bucket 2: Fast-Follows │   │   Bucket 3: Blacklist  │
│  (Non-Negotiable Core) │   │     (v1.1 Queue)       │   │     (Out-of-Scope)     │
│  - The 1 Core Loop     │   │  - Export to CSV       │   │  - User Auth / Login   │
│  - Essential UI / CLI  │   │  - Dark mode toggle    │   │  - Stripe / Billing    │
│  - Local Data Storage  │   │  - Advanced filters    │   │  - Multi-tenant teams  │
└────────────────────────┘   └────────────────────────┘   └────────────────────────┘
```

---

## 3. The Scope Creep Shield (Pushback Protocol)

When the user asks to add secondary features ("Can we also add user login and Slack notifications?"), the agent must execute the **Scope Creep Shield**:

1. **Acknowledge Value:** Validate the idea without being patronizing.
2. **Expose the Cost:** Clearly explain the architectural friction, token overhead, and time penalty.
3. **Quarantine to v1.1:** Offer a clear pivot to store it in the Fast-Follow queue.

### Canonical Pushback Script
> *"User authentication is a great feature, but adding it to v1 introduces password hashing, session cookies, database migrations, and password reset flows—multiplying our build surface by 3x before we’ve validated the core scraper.  
> Let's hardcode a local user session for v1, lock user auth into our `SPEC.md` v1.1 Fast-Follow bucket, and ship the core scraper today."*

---

## 4. Mandatory Handoff Artifact: `SPEC.md`

Stage 2 is complete **only** when `SPEC.md` is written to the repository root and approved:

```markdown
# [Project Name] — System Specification (`SPEC.md`)

> **Status:** Locked / Approved | **Target Version:** 1.0  
> **Last Verified:** [YYYY-MM-DD]

---

## 1. The Core Loop (v1 Moat)
- **Trigger:** [Exact user input or event trigger]
- **Core Action:** [The transformation or computational engine]
- **Reward / Output:** [The final artifact or UI display delivered]

---

## 2. Essential User Stories (Max 3)
1. **As a** [user type], **I want to** [action] **so that** [outcome].
2. **As a** [user type], **I want to** [action] **so that** [outcome].
3. **As a** [user type], **I want to** [action] **so that** [outcome].

---

## 3. Data Schema & Contracts
| Entity | Field | Type | Description |
| :--- | :--- | :--- | :--- |
| `Lead` | `id` | String / UUID | Unique record identifier |
| `Lead` | `url` | String | Source URL scraped |
| `Lead` | `summary` | Text | 2-sentence AI extraction |

---

## 4. Out-of-Scope Blacklist (Strictly Banned in v1)
- [ ] User authentication / Multi-user permissions
- [ ] Payment processing / Subscription billing
- [ ] Custom theming / Dark mode toggles
- [ ] Cloud sync / Third-party integrations (outside core loop)

---

## 5. Sign-Off & Handoff Gate
- **Verdict:** Locked & Approved
- **Next Stage:** Stage 3 (System Architecture & Slicing)
```
