// import express from 'express'
// import {
// 	updateTeamsInSupabase,
// 	updateRostersInSupabase
// } from '../services/apiService.js'

// const router = express.Router()

// router.post('/update-teams', async (req, res) => {
// 	try {
// 		await updateTeamsInSupabase()
// 		res.status(200).json({ message: 'Teams data updated successfully' })
// 	} catch (error) {
// 		console.error('Error updating teams data:', error)
// 		res
// 			.status(500)
// 			.json({ error: { message: error.message, stack: error.stack } })
// 	}
// })

// router.post('/update-rosters', async (req, res) => {
// 	try {
// 		console.log('Incoming Roster Data:', JSON.stringify(req.body, null, 2))

// 		const { roster, teamAbv } = req.body

// 		if (!roster || roster.length === 0) {
// 			throw new Error('Roster data is missing or empty')
// 		}
// 		await updateRostersInSupabase(roster, teamAbv)
// 		res.status(200).json({ message: 'Rosters data updated successfully' })
// 	} catch (error) {
// 		console.error('Error updating rosters data:', error)
// 		res
// 			.status(500)
// 			.json({ error: { message: error.message, stack: error.stack } })
// 	}
// })

// export default router
