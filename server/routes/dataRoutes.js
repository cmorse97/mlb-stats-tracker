import express from 'express'
import { updateTeams, updateRosters } from '../controllers/dataController.js'

const router = express.Router()

router.post('/update-teams', updateTeams)
router.post('/update-rosters', updateRosters)

export default router
