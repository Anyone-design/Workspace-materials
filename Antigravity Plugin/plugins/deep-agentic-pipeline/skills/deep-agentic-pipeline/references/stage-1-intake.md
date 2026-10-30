# Stage 1: Dynamic Intake & Socratic Red-Teaming Engine

> **Assigned Lead:** `strategy-inquisitor` (Principal Strategic Partner & Socratic Red-Teamer)  
> **Mandatory Exit Gate:** Signed-off `CLEARANCE.md` (Verdict: GREEN or YELLOW + Viable Pivot Blueprint)

---

## 1. Dynamic Delta Intake Protocol (Anti-Rushing Engine)

The agent must assess the **Information Delta** across 5 foundational vectors before drafting any clearance sheet:

$$\text{Information Delta} = [\text{Context Required for Elite Execution}] - [\text{Context Already Provided}]$$

### The 5 Diagnostic Vectors

1. **Core Problem & JTBD:** Who is the exact user, and what manual painful workflow is being automated or eliminated?
2. **Non-Negotiable Bounds:** Hard limits on budget ($0 vs paid), API keys (local vs OpenAI/Claude/Supabase), platforms, and timelines.
3. **Baseline Assets & Bandwidth:** Existing code, schemas, seed lists, or customer accounts available.
4. **Risk & Reversibility:** Type 1 (irreversible, real transactions, data mutations) vs Type 2 (reversible UI, drafts, local files).
5. **Fidelity Calibration:**
   - Visual Craft Dial: Tier 1 (Utility), Tier 2 (Modern SaaS), Tier 3 (Flagship Consumer Delight).
   - Backend Complexity Dial: Tier 1 (Micro-Monolith), Tier 2 (Modular Service), Tier 3 (Distributed Resilient).

### Dual-Mode Engagement
- **Rough / Fuzzy Ideation Mode:** When the user presents an early or open-ended idea, question caps are strictly banned. Partner with the user Socratic-style, explore analogies, and co-design the concept without rushing to write code.
- **Sharp / Defined Mode:** When the user knows exactly what they want, use structured options with recommended defaults to minimize friction.

---

## 2. Empirical Research & Freshness Audit

Whenever external packages or APIs are considered:
1. Apply the **4 Confidence Standards**: `Verified Fact`, `Empirical Consensus`, `Strategic Projection`, or `Identified Gap`.
2. Execute an **18-Month Freshness Audit**: Verify active support via package registry query (`npm view <pkg>`).
3. Ground data structures in official primary vendor documentation rather than plausible assumptions.

---

## 3. The 60-Day Pre-Mortem & AVI Scoring

Simulate failure 60 days post-launch:
> *"What killed this project? Where did the economic, platform, or operational cliffs hide?"*

Calculate the **Assumption Vulnerability Index (AVI)** for every critical hypothesis:
$$\text{AVI Score} = \text{Likelihood of Failure (1-5)} \times \text{Blast Radius (1-5)}$$
Any assumption scoring $\ge 12$ must have an explicit technical safeguard documented in `CLEARANCE.md`.

---

## 4. The Viable Pivot Engine

If the clearance verdict is `YELLOW` (conditional) or `RED` (fatal flaw):
- **Never leave the user stranded.**
- Immediately formulate **2 Concrete Viable Pivot Blueprints**:
  - **Pivot Blueprint A (Low-Friction Alternative):** Solves 80% of the pain using free, standard, or local APIs with 10x less platform risk.
  - **Pivot Blueprint B (Enterprise Alternative):** The formal, high-reliability architecture that eliminates risk at the cost of formal credentials.
- Define a numerical **Pivot Migration Threshold** to dictate when to graduate from Blueprint A to Architecture B.

---

## 5. Exit Deliverable: `CLEARANCE.md`

Use the standardized schema in `../templates/CLEARANCE.template.md`. Stage 1 is complete when `CLEARANCE.md` is committed to repository root and `.pipeline/session-[ID]/CLEARANCE.md`.
