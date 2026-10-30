# Stage 6 Reference: Polish, Deployment & Operational Lifelines

Stage 6 bridges the gap between a locally running project and a self-sustaining system in production. It enforces **Protocol Delta** to eliminate the leading cause of post-build failure: **Operational Abandonment**.

---

## 1. The "Vibe-Coder Survival Runbook" (`RUNBOOK.md`)

Every completed project must include a plain-English `RUNBOOK.md` in the repository root.

### Canonical Schema

```markdown
# [Project Name] — Operational Runbook

> **Target Audience:** Operator / Non-Coder  
> **Last Verified:** [YYYY-MM-DD] | **Status:** Production-Ready

---

## 1. Zero-Friction Quickstart (Copy-Paste)

### Prerequisites
- Node.js (v20+) or Python (3.11+) installed
- `.env` configured (see Section 2)

### Start Locally (1 Line)
```bash
npm run start
# OR: python -m app.main
```
- Open browser at: `http://localhost:3000`
- Live Health Check: `http://localhost:3000/health` (should return `{"status": "ok"}`)

---

## 2. Plain-English Environment Variable Decoder

| Variable | Plain-English Purpose | Where to Get It | Default / Example | Fatal If Missing? |
| :--- | :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Storage connection or file path | Auto-created on boot | `file:./prod.db` | Yes |
| `API_KEY` | Powers third-party data processing | Provider dashboard | `sk-...` | Yes |
| `PORT` | Local network port used by app | System config | `3000` | No (Defaults to 3000) |

---

## 3. The "Triage Trinity": 3 Most Common Crashes & 1-Line Fixes

### Crash A: "Port Already in Use" (`EADDRINUSE: 3000`)
- **What happened:** A previous session didn't terminate its background process.
- **1-Line Fix:**
  ```bash
  npm run kill-dev
  # Windows fallback: npx kill-port 3000
  ```

### Crash B: "Unauthorized / 401 Error"
- **What happened:** `.env` file is missing or your API key is invalid/expired.
- **1-Line Fix:** Check `.env` exists in root, verify credit balance on provider dashboard, and restart.

### Crash C: "Database Locked / Schema Mismatch"
- **What happened:** Concurrent writes or outdated schema.
- **1-Line Fix:**
  ```bash
  npm run db:reset
  ```
```

---

## 2. Zombie Process Prevention (`kill-dev`)

Every `package.json` or Python project must provide an automated, cross-platform port-clearing script:

```json
"scripts": {
  "start": "node src/server.js",
  "kill-dev": "npx kill-port 3000 8000 5173"
}
```

### Graceful Shutdown Interceptor
Every server entrypoint must handle `SIGINT` and `SIGTERM`:
```javascript
function registerShutdown(server, db) {
  const shutdown = async (signal) => {
    console.log(`\n[SHUTDOWN] Received ${signal}. Closing connections...`);
    server.close(() => {
      if (db) db.close();
      console.log("[SHUTDOWN] Clean exit complete. Sockets released.");
      process.exit(0);
    });
    setTimeout(() => {
      console.error("[SHUTDOWN] Force kill: connections took too long to drain.");
      process.exit(1);
    }, 3000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}
```

---

## 3. Archetype-Matched Deployment Matrix

Match the architecture chosen in Stage 3 to its optimal hosting tier:

| Project Archetype | Recommended Production Target | Database Strategy | Why It Fits |
| :--- | :--- | :--- | :--- |
| **Archetype A: CLI / Scheduled Bot** | **Fly.io Worker / Railway / VPS (Coolify)** | Local SQLite or Redis | Persistent daemon; serverless will freeze cron triggers. |
| **Archetype B: Full-Stack Web App** | **Vercel / Render / Cloudflare Pages** | Managed Serverless (Supabase / Neon) | Global edge CDN, zero maintenance, handles traffic spikes. |
| **Archetype C: API + Persistent Storage** | **Railway / Render / Hetzner VPS** | Mounted Persistent Volume (SQLite) | Preserves local disk state across container deploys without high database bills. |

### Pre-Flight Secret Quarantine Rule
Before any git push or deployment:
1. Verify `.env*` is in `.gitignore`.
2. Generate an empty `.env.example`.
3. Scan codebase for raw tokens (`sk-`, `ghp_`, DB passwords).

---

## 4. Production Health & Observability

1. **Mandatory `/health` Endpoint:** Returns HTTP 200 with `{ "status": "ok", "uptime": 1234, "db": "connected" }`.
2. **Capped Rolling Logging:** Rotate logs at 5MB, retain max 3 backups to prevent disk exhaustion.
3. **Free External Watchdog:** Hook `/health` to a free monitor (e.g. UptimeRobot free tier) for immediate downtime alerts.
