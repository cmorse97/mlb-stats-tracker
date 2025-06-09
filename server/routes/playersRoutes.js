import express from 'express'
import {
	getAllPlayers,
	getPlayerById
} from '../controllers/playersController.js'

const router = express.Router()

router.get('/', getAllPlayers)
router.get('/:playerId', getPlayerById)

export default router
