import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import dataRoutes from './routes/dataRoutes.js';
import playersRoute from './routes/playersRoutes.js';
import teamsRoutes from './routes/teamsRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json());

// Morgan Logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.use('/api/data', dataRoutes);
app.use('/api/teams', teamsRoutes); // Get all teams
app.use('/api/teams/:teamAbv', teamsRoutes); // Get single team
app.use('/api/teams/:teamAbv/roster', teamsRoutes); // Get players from a team's roster
app.use('/api/teams/:teamAbv/top-performers', teamsRoutes); // Get top performers from a team's roster
app.use('/api/teams/standings', teamsRoutes); // Get standings
app.use('/api/players', playersRoute); // Get all players + sub-routes

// API directory
app.get('/api', (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: 'MLB Stats Tracker API',
    version: '1.0.0',
    data_source: 'statsapi.mlb.com',
    routes: {
      teams: [
        {
          method: 'GET',
          path: '/api/teams',
          description: 'Get all 30 MLB teams with standings data',
          params: null,
        },
        {
          method: 'GET',
          path: '/api/teams/standings',
          description: 'Get full league standings grouped by division',
          params: null,
        },
        {
          method: 'GET',
          path: '/api/teams/:teamAbv',
          description: 'Get a single team by abbreviation',
          params: { teamAbv: 'e.g. NYY, LAD, BOS' },
        },
        {
          method: 'GET',
          path: '/api/teams/:teamAbv/roster',
          description: 'Get the active roster for a team',
          params: { teamAbv: 'e.g. NYY, LAD, BOS' },
        },
        {
          method: 'GET',
          path: '/api/teams/:teamAbv/top-performers',
          description: 'Get top performing players for a team',
          params: { teamAbv: 'e.g. NYY, LAD, BOS' },
        },
      ],
      players: [
        {
          method: 'GET',
          path: '/api/players',
          description: 'Get all players across all teams',
          params: null,
        },
        {
          method: 'GET',
          path: '/api/players/:playerId',
          description: 'Get a single player by MLB player ID',
          params: { playerId: 'e.g. 592450 (Aaron Judge)' },
        },
        {
          method: 'GET',
          path: '/api/players/league-leaders',
          description:
            'Get top 5 qualified leaders in key hitting and pitching categories',
          params: null,
        },
      ],
      data: [
        {
          method: 'POST',
          path: '/api/data/update-teams',
          description:
            'Manually trigger a teams + standings sync from MLB API to Supabase',
          params: null,
        },
        {
          method: 'POST',
          path: '/api/data/update-rosters',
          description:
            'Manually trigger a full player + stats sync from MLB API to Supabase',
          params: null,
        },
      ],
    },
    cron_jobs: [
      {
        schedule: '0 3 * * *',
        timezone: 'America/Chicago',
        jobs: ['update-teams', 'update-rosters'],
        description:
          'Render Cron Job runs scripts/sync.js daily at 3:00 AM CT',
      },
    ],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
