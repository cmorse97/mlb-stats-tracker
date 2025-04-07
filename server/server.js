import 'dotenv/config'
import express from 'express'
import cors from 'cors'
// import dataRoutes from './routes/dataRoutes.js'
import teamsRoutes from './routes/teamsRoutes.js'
import playersRoute from './routes/playersRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
// app.use('/api', dataRoutes)
app.use('/api/teams', teamsRoutes) // Get all teams
app.use('/api/teams/:teamAbv', teamsRoutes) // Get single team
app.use('/api/teams/:teamAbv/roster', teamsRoutes) // Get players from a team's roster
app.use('/api/players', playersRoute) // Get all players
app.use('/api/players/:playerId', playersRoute) // Get single player by id

// Test route
app.get('/', (req, res) => {
	res.send('MLB Stats Tracker backend is running!')
})

// Cron job
// import cron from './utils/cronJob.js'

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
