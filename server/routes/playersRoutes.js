import express from 'express'
import {
	getAllPlayers,
	getPlayerById,
	getLeagueLeadersController
} from '../controllers/playersController.js'

const router = express.Router()

router.get('/league-leaders', getLeagueLeadersController)
router.get('/', getAllPlayers)
router.get('/:playerId', getPlayerById)

export default router
