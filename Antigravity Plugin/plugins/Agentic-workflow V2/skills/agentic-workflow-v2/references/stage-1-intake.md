# Stage 1: Dynamic Intake, Empirical Research & Red-Teaming

> **Primary Mission:** Transform underspecified, rough, or ambitious ideas into verified, stress-tested foundations.  
> **Mandatory Handoff Artifact:** `Concept Clearance Sheet`  
> **Exit Gate:** Verdict is `GREEN` or `YELLOW` (with actionable pivot blueprints) explicitly signed off by the user.

---

## 1. The Strict Airlock Constraint (Anti-Rushing Rule)

- **The Danger:** Naive agents ask 3–4 superficial questions and immediately draft `SPEC.md` or `ROADMAP.md` in the same turn. This is the **Blindness Trap**.
- **The Airlock Law:** Stage 1 is strictly restricted to diagnostic intake, deep empirical research, and vulnerability sparring. 
- Generating `SPEC.md`, directory trees, or code during Stage 1 is strictly prohibited. You cannot leave Stage 1 until the `Concept Clearance Sheet` is committed and approved by the user.

---

## 2. Dynamic Information-Delta Calibration

Do not restrict yourself to an arbitrary number of questions (e.g. "ask 2–3 questions"). Calibrate diagnostic questions dynamically based on the **Information Delta**:

$$\text{Information Delta} = [\text{Context Required for Elite Output}] - [\text{Context Already Provided}]$$

### Handling Different Scenarios:
1. **Rough / Incomplete Ideas:**
   - If the user's concept is raw, explore it collaboratively with patience, regardless of the time or number of conversational turns required.
   - Act as a true co-founder: offer strategic suggestions, unearth hidden nuances, and flesh out the vision together.
2. **Flexible Questioning Style:**
   - Structure technical forks with **Sensible Multiple-Choice Scaffolding** (Option A vs. Option B) to eliminate decision fatigue on infrastructure.
   - Use **Open-Ended Socratic Questions** whenever discussing user motivations, business models, or unique product feel. Never artificially force open discussions into multiple-choice boxes.
3. **The 4 Core Missing Pillars to Investigate:**
   - **Core Objective & Success Metrics:** What exact outcome defines success? (e.g., *"Scrape 500 records/hour"* vs. *"Interactive client dashboard"*).
   - **Hard Constraints & Non-Negotiables:** Budget ceiling, free-tier limits, preferred tech stack, strict deadlines, zero cloud dependencies.
   - **Baseline Capabilities & Assets:** What exists today? (API keys, raw data, pre-built schemas, maintenance capacity).
   - **Risk Classification:**
     - *Type 1 (Irreversible / High Blast Radius):* Destructive migrations, third-party payment wiring, compliance exposure. Needs defensive guardrails.
     - *Type 2 (Reversible / Low Cost):* Button styles, in-memory caches, local mock views. Prioritize rapid velocity.

---

## 3. Strict Research & Anti-Hallucination Standards

When evaluating any external tool, library, API, or pricing model, strictly follow the **Research Rule**:

### The 4 Confidence Standards:
1. **Verified Fact:** Directly verified against primary documentation, official package manifests (`npm view`, `pip index`), or official pricing pages. State source and date.
2. **Empirical Consensus:** Industry-standard best practices backed by multiple independent sources.
3. **Strategic Projection:** Logical deduction or unit-economic estimates. Explicitly label underlying assumptions.
4. **Identified Gap / Unknown:** If data is unmeasured or private, state it plainly:  
   > *"I checked official docs for [X]; current public data does not disclose [Y]."*  
   Never guess or invent figures to fill voids.

### Research Hygiene:
- **18-Month Freshness Audit:** For fast-moving ecosystems (AI SDKs, Next.js, cloud pricing), actively check publication dates and flag data older than 18 months.
- **Primary Sources First:** Prioritize official API docs and source repos over aggregator blogs and forum posts.

---

## 4. Uncompromising Red-Teaming & Actionable Pivot Engine

Critique without an alternative is useless. When red-teaming:

1. **Expose Fragile Assumptions:** Uncover 2–3 unexamined premises that could break under real-world stress.
2. **Identify Critical Breaking Points:** Highlight where rate limits, memory leaks, or platform blocking will occur.
3. **The Actionable Pivot Engine (YELLOW / RED Verdicts):**
   - If an idea is flawed or dangerous (`YELLOW` or `RED`), **never leave the user stranded**.
   - Provide concrete **viable alternative blueprints** (e.g., *"Direct scraping of Instagram is RED due to aggressive IP bans. Pivot Blueprint A: Official Meta Graph API; Pivot Blueprint B: Headless stealth proxy with exponential backoff"*).
   - Provide **Pivot Triggers** with measurable thresholds.

---

## 5. Mandatory Stage 1 Handoff Schema: `Concept Clearance Sheet`

```markdown
# Concept Clearance Sheet

- **Project Name:** [Project Name]
- **Target User & Core Problem:** [Who is this for, and what painful friction does it resolve?]
- **Verdict:** [GREEN (Proceed) | YELLOW (Proceed with Countermeasures) | RED (Halt / Pivot)]
- **Locked Non-Negotiable Constraints:**
  - Tech Stack Bounds: [Languages, runtimes, allowed libraries]
  - Deployment & Runtime Limits: [Local only, cloud free-tier, VPS]
  - Risk Classification: [Type 1 or Type 2]
- **Key Empirical Baseline:**
  - [Verified Fact 1 with primary source]
  - [Identified Gap / Assumption with labeling]
- **Identified Failure Modes & Pre-Planned Countermeasures:**
  - *Risk:* [Identified failure point or platform block]
  - *Safeguard:* [Operational defense / architecture pattern]
- **Viable Pivot Options (Mandatory if YELLOW or RED):**
  - *Pivot Option A:* [Alternative viable path]
  - *Pivot Option B:* [Alternative viable path]
- **Handoff Decision:** [Approved to advance to Stage 2 | Iterating on Pivots]
```
