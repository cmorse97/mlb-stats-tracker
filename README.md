# MLB Stats Tracker

A full-stack web application for exploring real-time Major League Baseball statistics — team standings, league leaders, rosters, and individual player stats — built with React, Node.js/Express, and Supabase.

---

## Features

- **League Standings** — AL/NL tabbed standings with W-L, PCT, GB, streak, runs scored/allowed, and run differential, organized by division
- **League Leaders** — Qualified hitters and pitchers ranked by key stat categories (AVG, HR, RBI, OPS, SB / ERA, K, WHIP, W, SV), split by league
- **Team Pages** — Branded team headers with color-coded stats; top performers for hitting and pitching; full sortable roster
- **Player Modals** — Detailed individual stat sheets with full hitting and pitching splits
- **Automated Sync** — Daily cron job pulls fresh data from the MLB Stats API and syncs to Supabase at 3 AM ET

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Tailwind CSS v4, Vite |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Scheduling | node-cron |
| HTTP Client | Axios |
| Data Source | [MLB Stats API](https://statsapi.mlb.com/api/v1) (free, no key required) |
| Assets | [mlbstatic.com](https://www.mlbstatic.com) (logos, player photos) |

---

## Project Structure

```
mlb-stats-tracker/
├── client/                     # React frontend
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/              # Route-level page components
│       ├── services/           # Axios API client
│       └── utils/              # Helpers (sorting, team constants)
└── server/                     # Express backend
    ├── controllers/            # Request/response handlers
    ├── models/                 # MLB API fetch + Supabase upsert logic
    ├── routes/                 # Express route definitions
    ├── services/               # Business logic (standings, leaders, performers)
    └── utils/                  # Supabase client, cron job scheduler
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [Supabase](https://supabase.com) project with the schema below

### Supabase Schema

```sql
create table teams (
  mlb_id        int primary key,
  name          text,
  city          text,
  team_abv      text unique,
  league        text,
  league_abv    text,
  division      text,
  logo          text,
  wins          int,
  losses        int,
  runs_scored   int,
  runs_allowed  int,
  run_diff      int,
  streak        text
);

create table players (
  player_id     int primary key,
  name          text,
  position      text,
  team_id       int,
  team_abv      text,
  bday          date,
  jersey_number int,
  bats          text,
  throws        text,
  height        text,
  weight        text,
  avatar        text,
  stats         jsonb
);
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mlb-stats-tracker.git
cd mlb-stats-tracker

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
```

### Running the App

```bash
# Start the backend (from /server)
npm run dev       # development (nodemon)
npm start         # production

# Start the frontend (from /client)
npm run dev       # development (Vite, http://localhost:5173)
npm run build     # production build
```

The API server runs on `http://localhost:3000`.

### Initial Data Load

On first run, seed the database by calling the manual sync endpoints:

```bash
curl -X POST http://localhost:3000/api/data/update-teams
curl -X POST http://localhost:3000/api/data/update-rosters
```

After the initial seed, data is refreshed automatically every day at 3 AM ET.

---

## API Reference

### Teams

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/teams` | All 30 teams |
| `GET` | `/api/teams/standings` | Standings grouped by league and division |
| `GET` | `/api/teams/:teamAbv` | Single team record |
| `GET` | `/api/teams/:teamAbv/roster` | Active roster for a team |
| `GET` | `/api/teams/:teamAbv/top-performers` | Top 6 hitters + pitchers for a team |

### Players

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/players` | All players |
| `GET` | `/api/players/:playerId` | Single player record |
| `GET` | `/api/players/league-leaders` | Top 5 qualified leaders per stat, split by AL/NL |

### Data Sync

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/data/update-teams` | Manually sync teams and standings from MLB API |
| `POST` | `/api/data/update-rosters` | Manually sync all rosters and player stats from MLB API |

---

## Data Sync Architecture

Player and team data is fetched from the MLB Stats API and persisted in Supabase via a daily cron job.

```
MLB Stats API
  └── node-cron (0 3 * * * ET)
        ├── updateTeams()
        │     └── /api/v1/teams + /api/v1/standings → teams table
        └── updatePlayers()
              └── /api/v1/teams/{id}/roster + /api/v1/stats → players table
```

Qualification thresholds for league leaders are calculated dynamically based on average team games played — so rankings stay accurate as the season progresses.

---

## Roadmap

- [ ] Previous/next player navigation within the player modal
- [ ] Collapsible roster row showing last game stats inline
- [ ] Player performance charts (season arc, rolling averages)
- [ ] Authentication and personalized team/player favorites

---

## Acknowledgements

- Stats data provided by the [MLB Stats API](https://statsapi.mlb.com/api/v1)
- Team logos and player photos from [mlbstatic.com](https://www.mlbstatic.com)
- Database hosted on [Supabase](https://supabase.com)
