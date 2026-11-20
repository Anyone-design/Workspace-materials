# [Project Name] — Operational Runbook (`RUNBOOK.md`)

> **Target Audience:** Non-Technical Operator / Vibe-Coder  
> **Last Verified:** [YYYY-MM-DD] | **Status:** Production-Ready  
> **Lead Reliability Engineer:** Subagent `sre-specialist`

---

## 1. Zero-Friction Quickstart (Copy-Paste)

### Prerequisites
- Node.js (v20+) installed
- `.env` configured (see Section 2)

### Step 1: Health Diagnostic (Pre-Flight)
```bash
npm run doctor
```
*(Confirms runtime engine, environment keys, database writable, and dependencies are 100% ready).*

### Step 2: Start Locally (1 Line)
```bash
npm run start
```
- Open browser at: `http://localhost:3000`
- Live Health Status: `http://localhost:3000/health` (returns `{"status":"ok"}`)

---

## 2. Plain-English Environment Variable Decoder

| Variable | Plain-English Purpose | Where to Get It | Example Value | Fatal If Missing? |
| :--- | :--- | :--- | :--- | :---: |
| `PORT` | Local network port used by app | System config | `3000` | No (Defaults to 3000) |
| `DATABASE_URL` | File path for SQLite storage | Auto-created on boot | `file:./data/prod.db` | Yes |
| `API_KEY` | External service authentication | Provider dashboard | `sk-proj-...` | Yes |

---

## 3. The "Triage Trinity": 3 Most Common Crashes & 1-Line Fixes

### Crash A: "Port in Use" (`EADDRINUSE: 3000`)
- **What happened:** A previous server session didn't terminate cleanly.
- **1-Line Fix:**
  ```bash
  npm run kill-dev
  ```

### Crash B: "Unauthorized / 401 Error"
- **What happened:** `.env` file is missing or your API key is invalid/expired.
- **1-Line Fix:** Run `npm run doctor` to pinpoint the missing key, update `.env`, and restart.

### Crash C: "Database Locked / Busy"
- **What happened:** SQLite WAL lock or concurrent session conflict.
- **1-Line Fix:**
  ```bash
  npm run kill-dev && npm run start
  ```

---

## 4. Production Deployment Guide
- **Target Platform:** [e.g. Render / Railway / Vercel]
- **Build Command:** `npm install`
- **Start Command:** `npm run start`
- **Health Check Path:** `/health`
- **Secret Quarantine:** Verified `.env` is uncommitted and excluded in `.gitignore`.

---

## 5. Final Project Sign-Off
- **Verdict:** Certified Production-Ready & Operational
- **Pipeline Complete:** All 6 Stages Airlocked & Signed-Off
