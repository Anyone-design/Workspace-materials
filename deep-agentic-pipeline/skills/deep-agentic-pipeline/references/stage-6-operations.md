# Stage 6: Day-1 Operations, Diagnostics & Reliability Engine

> **Assigned Lead:** `sre-specialist` (Site Reliability Engineer — Google SRE Book, 12-Factor App)  
> **Mandatory Exit Gate:** Verified `RUNBOOK.md`, passing `npm run doctor`, active `/health` route, verified `kill-dev` script

---

## 1. Day-1 Diagnostic Suite (`npm run doctor`)

Static documentation is insufficient without active diagnostic tools. Stage 6 equips the project with `src/server/scripts/doctor.js`:

Running `npm run doctor` executes four automated verification checks:
1. **Runtime & Engine Audit:** Verifies Node.js ($\ge 20.x$) / Python ($\ge 3.11$).
2. **Environment Variable Completeness:** Cross-references `.env.example` keys against `.env`. Halts and outputs exact missing line numbers.
3. **Storage & Permission Handshake:** Opens database file, verifies write permissions, and tests WAL mode activation.
4. **Outbound Network Probe:** Pings external APIs or gateways to verify firewall/proxy access.

---

## 2. Cross-Platform Zombie Process Termination (`npm run kill-dev`)

To prevent port locking crashes (`EADDRINUSE: 3000`):
- Expose `npm run kill-dev` in `package.json`:
  ```json
  "scripts": {
    "start": "node src/server/app.js",
    "doctor": "node src/server/scripts/doctor.js",
    "kill-dev": "npx kill-port 3000 5173 8000"
  }
  ```
- Mount `SIGINT` and `SIGTERM` listeners in server entrypoint to close sockets cleanly within 1.5s and flush database locks.

---

## 3. Production Health Telemetry (`GET /health`)

Server exposes an unauthenticated, zero-overhead `/health` route:
```json
{
  "status": "ok",
  "uptimeSeconds": 3600,
  "database": "connected",
  "version": "1.0.0"
}
```

---

## 4. The "Triage Trinity" Incident Playbook

Include 1-line copy-paste fixes for the 3 most common operator crashes:
- **Crash A: "Port in Use" (`EADDRINUSE: 3000`)**  
  *Fix:* `npm run kill-dev`
- **Crash B: "Unauthorized / 401 Error"**  
  *Fix:* Run `npm run doctor` to identify the missing or malformed key in `.env`.
- **Crash C: "Database Locked / Schema Mismatch"**  
  *Fix:* `npm run kill-dev && npm run start`

---

## 5. Exit Deliverable: `RUNBOOK.md`

Use the standardized template in `../templates/RUNBOOK.template.md`. Stage 6 is complete when `RUNBOOK.md` is committed and `npm run doctor` exits 0.
