# Stage 1 Reference: Socratic Interrogation & Red-Teaming

Stage 1 transforms ambiguous or open-ended user ideas into verified, stress-tested foundations. The goal is to eliminate the two biggest early failure modes: the **Blindness Trap** (building without knowing critical constraints) and the **Premature Coding Trap** (writing code before verifying feasibility).

---

## 1. Dynamic Delta Diagnostic Rubric

Do not use fixed question caps. Instead, evaluate the **Information Delta** across four non-negotiable pillars:

| Pillar | Diagnostic Objective | Example Diagnostic Inquiries |
| :--- | :--- | :--- |
| **1. Core Objective & Success Metrics** | What exact numeric or behavioral outcome defines success? | *"Does success mean 100 leads scraped per hour, or a simple 1-click export of 10 rows?"* |
| **2. Hard Constraints & Non-Negotiables** | What capital, deadline, tech stack, or API limits bind this project? | *"Do you require 100% free-tier tools, or do you have a paid OpenAI / Supabase API key?"* |
| **3. Baseline Assets & Bandwidth** | What existing code, schema, API keys, or operational bandwidth exist? | *"Do you already have a target website list, or do we need to build automated discovery?"* |
| **4. Risk Tolerance (Type 1 vs Type 2)** | Are failures easily reversible (UI layout) or catastrophic (financial charge, data loss)? | *"Is this processing live user payments (Type 1), or generating internal draft emails (Type 2)?"* |

---

## 2. Frictionless Multi-Choice Scaffolding

Non-technical vibe-coders freeze when asked open-ended architectural questions like *"What database architecture do you prefer?"*

**The Law:** The agent must structure every diagnostic inquiry with multiple-choice scaffolding and a clear recommended default:

> *"For your data storage, which setup fits your workflow best?*  
> - **Option A (Recommended):** Local SQLite file. Zero setup, zero monthly cost, works immediately on your machine.  
> - **Option B:** Cloud Supabase (Postgres). Accessible from anywhere, but requires creating a free account and pasting an API key.  
> - **Option C:** Simple JSON file. Lightweight, but not suitable for more than 500 records.*"

---

## 3. Empirical Research & Anti-Hallucination Triggers

Before approving a concept involving third-party APIs, pricing, or rapidly evolving AI libraries:
1. **18-Month Freshness Audit:** For fast-moving libraries (LangChain, OpenAI SDK, Next.js App Router), do not rely on training memory. Verify current API syntax.
2. **Primary Sources over Blog Aggregators:** Check official package documentation (`npmjs.com`, `pypi.org`, official docs) rather than medium/blog articles.
3. **Transparent Data Labeling:** If an API quota or pricing detail cannot be verified publicly, state explicitly: *"I verified the current docs; the public pricing tier does not disclose custom enterprise rate limits."*

---

## 4. Red-Team Sparring Protocol

Before writing the clearance sheet, the agent must evaluate the concept against failure:
1. **Expose Fragile Assumptions:** Isolate unexamined premises the user is taking for granted that may be false (e.g., *"Assuming Twitter allows unauthenticated scraping without blocking IP addresses"*).
2. **Failure Modes:** Identify the exact breaking points under stress (rate limits, cold-boot latency, memory leaks).
3. **Tactical Safeguards:** Pair every verified risk with a concrete, low-overhead countermeasure.

---

## 5. Mandatory Handoff Artifact: `Concept Clearance Sheet`

Stage 1 is complete **only** when this markdown block is presented and signed off:

```markdown
## Concept Clearance Sheet

- **Project Name:** [Name]
- **Target User & Core Problem:** [1 sentence on who uses this and what pain it solves]
- **Verdict:** [GREEN (Proceed) | YELLOW (Proceed with Safeguards) | RED (Halt/Redesign)]
- **Locked Non-Negotiable Constraints:**
  - Tech Stack Bounds: [e.g., Node.js + SQLite, 100% free-tier]
  - Timeline & Scope Limit: [e.g., Single-loop prototype within 1 session]
  - Risk Classification: [Type 1 (Irreversible) | Type 2 (Reversible)]
- **Identified Failure Mode & Countermeasure:**
  - *Risk:* [Primary technical or architectural vulnerability]
  - *Safeguard:* [Exact safeguard implemented to prevent failure]
- **Handoff Decision:** Approved to proceed to Stage 2 (Feature Scoping).
```
