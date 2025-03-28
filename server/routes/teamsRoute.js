import express from 'express'
import {
	getAllTeams,
	getTeamByTeamAbv
} from '../controllers/teamsController.js'

const router = express.Router()

router.get('/', getAllTeams)
router.get('/:teamAbv', getTeamByTeamAbv)

export default router
