# Stage 6: Unified Operations, Runbook & Deployment

> **Primary Mission:** Eliminate post-build abandonment with operational survival lifelines, multi-port cleaners, and an idiot-proof runbook.  
> **Mandatory Handoff Artifact:** `RUNBOOK.md` + verified `/health` endpoint + `kill-dev` script.  
> **Exit Gate:** 1-line unified startup verified; all background processes cleanly terminable; user is completely self-sufficient.

---

## 1. Protocol Delta: Operational Survival Lifelines

The primary failure mode of AI-assisted projects is post-build abandonment: the code builds once, but the user is stranded by locked ports, missing environment variables, or silent server crashes. 
Stage 6 enforces **Protocol Delta**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Unified 1-Line Startup Command                                      │
│    Single command boots both frontend and backend (e.g. npm run dev)   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Multi-Port Zombie Cleaner (npm run kill-dev)                        │
│    Kills orphaned processes across all application ports with 1 command│
├────────────────────────────────────────────────────────────────────────┤
│ 3. Plain-English Survival Runbook (RUNBOOK.md)                         │
│    Zero jargon; copy-paste commands, env decoders & Triage Trinity     │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Graceful Shutdown & Unauthenticated /health Route                   │
│    Drains database handles on Ctrl+C; monitors live service health     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Multi-Port Zombie Cleaner (`kill-dev`)

Add a cross-platform port-clearing script to `package.json` targeting all ports used by the decoupled stack:

```json
"scripts": {
  "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
  "kill-dev": "npx kill-port 3000 5173"
}
```

Whenever a port collision occurs (*"EADDRINUSE: address already in use"*), the user simply runs:
```bash
npm run kill-dev
```

---

## 3. Clean Process Termination Handlers

Every server entrypoint must include graceful shutdown signal listeners:

```javascript
function registerGracefulShutdown(server, db) {
  const shutdown = (signal) => {
    console.log(`\n[SHUTDOWN] Received ${signal}. Closing server sockets...`);
    server.close(() => {
      if (db && typeof db.close === 'function') {
        db.close();
        console.log('[SHUTDOWN] Database connections closed.');
      }
      console.log('[SHUTDOWN] All ports released. Clean exit.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('[SHUTDOWN] Forced kill: timeout exceeded.');
      process.exit(1);
    }, 3000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}
```

---

## 4. Mandatory `/health` Ping

Every backend service must expose an unauthenticated `GET /health` route returning HTTP 200:

```json
{
  "status": "healthy",
  "uptime": 3600,
  "database": "connected",
  "timestamp": "2026-10-24T18:00:00Z"
}
```

---

## 5. Archetype-Matched Deployment Matrix

Match the project architecture to the simplest hosting provider:

| Archetype | Recommended Host | Database Strategy | Rationale |
| :--- | :--- | :--- | :--- |
| **Archetype A: CLI / Scheduled Bot** | **Fly.io / Railway / VPS (Coolify)** | SQLite or Redis | Requires persistent background runtime; serverless lambdas freeze background cron timers. |
| **Archetype B: Full-Stack Web App** | **Vercel / Cloudflare Pages / Render** | Supabase or Neon | Global Edge CDN, automated SSL, zero server maintenance. |
| **Archetype C: API + Persistent Storage** | **Railway / Render / Hetzner VPS** | Mounted Persistent Volume (SQLite/Postgres) | Keeps disk storage intact across redeploys without expensive cloud DB fees. |

---

## 6. Mandatory Stage 6 Handoff Schema: `RUNBOOK.md`

```markdown
# [Project Name] — Operational Runbook (`RUNBOOK.md`)

> **Last Updated:** [YYYY-MM-DD] | **Version:** 1.0 Production Standard

---

## 1. Fast-Start Quick Reference

### 1-Line Development Startup
```bash
npm run dev
```
- **Frontend App:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/health

### Port Collision / Zombie Process Cleanup
If you see `EADDRINUSE: address already in use`, run:
```bash
npm run kill-dev
```

---

## 2. Environment Variables Decoder

| Variable Name | Required? | Default | Description & Where to Find |
| :--- | :---: | :--- | :--- |
| `PORT` | No | `3000` | Port for the backend API server. |
| `DATABASE_URL` | Yes | `sqlite://./data/app.db` | Local file path or cloud database connection string. |
| `API_KEY` | Yes | — | Third-party service API key (obtained from provider dashboard). |

---

## 3. The "Triage Trinity" (Troubleshooting)

### Crash 1: Port Already In Use (`EADDRINUSE`)
- **Symptom:** Server crashes immediately on boot with `Error: listen EADDRINUSE: address already in use :::3000`.
- **Solution:** Run `npm run kill-dev` to terminate orphaned node background processes.

### Crash 2: Missing or Invalid API Credentials (`401 / 403`)
- **Symptom:** UI displays authentication error or server logs `Invalid API Key`.
- **Solution:** Check `.env` file in the project root. Ensure keys have no surrounding quotes or trailing spaces.

### Crash 3: Database Locked or Corrupted (`SQLITE_BUSY`)
- **Symptom:** API requests hang or log `database is locked`.
- **Solution:** Ensure only one server process is active. Run `npm run kill-dev`, then restart with `npm run dev`.
```
