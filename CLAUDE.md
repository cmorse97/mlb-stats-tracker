# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MLB Stats Tracker is a full-stack app displaying live MLB stats. The backend is an Express API deployed on **Render** (free tier). The frontend is React/Vite deployed on **Netlify**. Data is stored in **Supabase** (Postgres) and synced daily from the free MLB Stats API (`statsapi.mlb.com`).

This app is live in production. Prefer small, targeted edits over refactors. Always consider mobile layout when touching UI.

## Commands

### Client (`client/`)
```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # Production build (output: dist/)
npm run lint      # ESLint check
```

### Server (`server/`)
```bash
npm run dev       # Start Express with nodemon (localhost:3000)
npm start         # Start Express without nodemon (production)
node scripts/sync.js  # Manually run the full MLB data sync
```

## Architecture

### Data Flow

Data originates from `statsapi.mlb.com` (free, no auth required) and is fetched, transformed, and upserted into Supabase once per day via a Render native Cron Job (`node scripts/sync.js`, `0 9 * * *` UTC = 3 AM CT).

```
MLB Stats API → server/models/* → Supabase (teams + players tables)
                                        ↓
                         Express API endpoints → React client
```

Player stats are stored as a JSONB column (`{ Hitting: {...}, Pitching: {...} }`), which keeps the schema flexible as stat categories change across seasons.

### Server Layer Structure

```
routes/ → controllers/ → services/ or models/
```

- **models/** — fetch from MLB API + upsert to Supabase. `playerModel.js` fetches all 30 rosters in parallel, then merges batch hitting/pitching stats by `player_id`.
- **services/** — business logic on Supabase data:
  - `topPerformersService.js` — top 6 hitters + 6 pitchers per team, using `parseStat()`/`parseStatLowIsBetter()` helpers
  - `leagueLeadersService.js` — top 5 per stat category (AL/NL split), with dynamically calculated qualification thresholds based on avg team games
  - `standingService.js` — groups teams by league/division, calculates win% and games back (GB)
- **controllers/** — thin handlers that call services/models and return `{ statusCode, message, body }`

### Client Structure

All API calls go through `src/services/api.js` (Axios, base URL from `VITE_API_URL`).

Pages: `Home` (teams grid + league leaders + standings widgets), `Standings` (full divisions), `RosterPage` (top performers + sortable roster → `PlayerModal`).

`src/utils/teamConstants.js` holds team metadata (colors, abbreviations). `src/utils/sortRosterTable.js` handles roster column sorting logic.

### API Response Shape

All endpoints return the same shape:
```json
{ "statusCode": 200, "message": "...", "body": <data> }
```

## Environment Variables

### Client (`client/.env`)
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend base URL — must include `/api` suffix (e.g. `http://localhost:3000/api`) |

### Server (`server/.env`)
| Variable | Purpose |
|---|---|
| `PORT` | Express port (default: `3000`) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (used for writes) |
| `MLB_API_URL` | MLB API base (default: `https://statsapi.mlb.com/api/v1`) |
| `NODE_ENV` | `production` or `development` |
| `CLIENT_URL` | CORS allowed origin (default: `http://localhost:5173`) — set to Netlify URL in production |

Production env vars live in the Netlify and Render dashboards, not in any committed file.

## Key Conventions

- Prefer descriptive variable names over vague single letters (e.g. `player` not `p`, `team` not `t`)
- Backend uses **ES modules** (`import`/`export`), not CommonJS
- **Tailwind CSS v4** — no `tailwind.config.js` needed; v4 defaults apply
- **MUI** is used alongside Tailwind for some components — don't mix unnecessarily
- No TypeScript in source files; `@types/*` packages are dev-only
- The Render Cron Job and web service are separate services — `sync.js` does not run inside the web server process

## Deployment

| Layer | Service |
|---|---|
| Frontend | Netlify (auto-deploys from `main`) |
| Backend API | Render web service |
| Database | Supabase |
| Daily sync | Render native Cron Job (`node scripts/sync.js`) |
| Keep-alive | UptimeRobot pings `/api` every 5 min (prevents Render free tier sleep) |

To manually trigger a data sync in production:
```bash
curl -X POST https://<render-url>/api/data/update-teams
curl -X POST https://<render-url>/api/data/update-rosters
```
