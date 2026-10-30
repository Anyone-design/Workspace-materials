# Backend Security Shield (OWASP Top 10 & SEC-001 – SEC-006)

> **Scope:** Global Invariant Rule  
> **Status:** Strictly Enforced by `backend-systems-specialist` and `code-auditor`  

---

During Phase 4B (Backend Track) and Stage 5 (Integration), the following six security laws are non-negotiable:

### SEC-001: SQL Injection Immunization
- **Law:** 100% Parameterized queries and prepared statements (`WHERE id = ?` or `$1`).
- **Ban:** Raw string interpolation, template literals, or string concatenation inside SQL query strings are strictly forbidden.

### SEC-002: Zero-Trust Input Validation
- **Law:** Every incoming HTTP request body, query parameter, and route parameter must pass strict schema validation (Zod, Joi, or native assertion schemas) before entering domain logic.
- **Rule:** Unrecognized or unexpected payload fields are automatically stripped or rejected with HTTP 400 Bad Request.

### SEC-003: Command Injection Immunization
- **Law:** Passing untrusted user inputs to shell execution commands (`child_process.exec`) is strictly forbidden.
- **Rule:** Use parameterized execution arrays (`execFile`, `spawn`) with `{ shell: false }` and zero shell string interpolation.

### SEC-004: Secret Quarantine & Log Sanitization
- **Law:** Zero hardcoded API keys, bearer tokens, database passwords, or private keys.
- **Rule:** Environment variables loaded via `.env` must never be logged to console/files or returned in error payloads.

### SEC-005: DoS & Resource Exhaustion Defense
- **Law:** Every database SELECT query must declare an explicit `LIMIT` clause (e.g. `LIMIT 50` or `LIMIT 100`).
- **Rule:** Public endpoints must incorporate rate-limiting middleware or bounded concurrent request queues.

### SEC-006: Sanitized Error Payloads & Secure Headers
- **Law:** Stack traces, internal database schema definitions, and system filepaths must never be exposed to clients in production HTTP responses.
- **Rule:** APIs return consistent, sanitized error envelopes: `{ "error": "Human-friendly explanation", "code": "ERR_INVALID_INPUT" }`.
