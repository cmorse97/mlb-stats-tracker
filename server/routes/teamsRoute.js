import express from 'express'
import {
	getAllTeams,
	getTeamByTeamAbv,
	getRosterByTeamAbv
} from '../controllers/teamsController.js'

const router = express.Router()

router.get('/', getAllTeams)
router.get('/:teamAbv', getTeamByTeamAbv)
router.get('/:teamAbv/roster', getRosterByTeamAbv)

export default router
