import express from 'express'
import { updateTeamsInSupabase } from '../services/apiService.js'

const router = express.Router()

router.post('/update-teams', async (req, res) => {
	try {
		await updateTeamsInSupabase()
		res.status(200).json({ message: 'Teams data updated successfully' })
	} catch (error) {
		console.error('Error updating teams data:', error)
		res
			.status(500)
			.json({ error: { message: error.message, stack: error.stack } })
	}
})

export default router
