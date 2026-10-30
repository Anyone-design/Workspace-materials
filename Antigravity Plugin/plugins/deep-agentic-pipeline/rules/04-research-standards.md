# Empirical Research & Anti-Hallucination Standards

> **Scope:** Global Invariant Rule  
> **Status:** Strictly Enforced Across All Stages  

---

Whenever external libraries, third-party APIs, database schemas, cloud pricing, or web scraping are involved, the agent must anchor all claims and technical decisions in empirical evidence.

### 1. The 4 Confidence Standards

Every technical premise, API endpoint, and package dependency must be categorized into one of four confidence levels:

1. **`Verified Fact`**: Directly proven via primary vendor documentation, RFC specifications, or live CLI registry queries (`npm view <pkg>`, `pip index versions <pkg>`).
2. **`Empirical Consensus`**: Confirmed across multiple reputable engineering sources, official issue trackers, or established open-source implementations.
3. **`Strategic Projection`**: Forward estimates or architectural calculations grounded in explicit unit economics or hardware formulas (explicitly labeled as an estimate).
4. **`Identified Gap`**: Explicitly labeled unknown: *"Searched [X]; current public documentation does not disclose [Y]."* Prohibits fabricating plausible assumptions.

### 2. The 18-Month Freshness Audit
- Any API endpoint, library documentation, or SDK guide older than **18 months** must be flagged as suspect.
- The agent must run an automated background check against the package registry before using deprecated methods or packages.

### 3. Protocol Epsilon: Autonomous Dependency Validation
Before executing any installation command (`npm install`, `pip install`):
1. **Registry Health Query:**
   ```bash
   npm view <package-name> version
   # or: pip index versions <package-name>
   ```
2. **Health Thresholds:** The package must be actively maintained (< 18 months dormant), with zero critical CVEs, and reasonable download velocity.
3. **The Native Fallback Standard:** If a package introduces heavy dependencies for standard utilities (e.g. date formatting, UUID generation, HTTP fetch), native platform capabilities must be used instead (`crypto.randomUUID()`, `fetch()`, `Intl.DateTimeFormat`).
