import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import dataRoutes from './routes/dataRoutes.js'
import teamsRoute from './routes/teamsRoute.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', dataRoutes)
app.use('/api/teams', teamsRoute)
app.use('/api/teams/:teamAbv', teamsRoute)

// Test route
app.get('/', (req, res) => {
	res.send('MLB Stats Tracker backend is running!')
})

// Cron job
import cron from './utils/cronJob.js'

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
