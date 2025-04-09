import cron from 'node-cron'
import {
	fetchAllPlayers,
	storePlayersInSupabase
} from '../models/playerModel.js'

import { fetchTeams, storeTeamsInSupabase } from '../models/teamModel.js'

export const updatePlayers = () => {
	// Run this job once every 24 hours at 03:00
	cron.schedule('0 3 * * *', async () => {
		console.log('Running scheduled job to update players data...')
		try {
			const players = await fetchAllPlayers()
			await storePlayersInSupabase(players)
			console.log('Players data updated successfully')
		} catch (err) {
			console.error('Failed to update players data:', err)
		}
	})
}

export const updateTeams = () => {
	// Run this job once every 24 hours at 03:00
	cron.schedule('0 3 * * *', async () => {
		console.log('Running scheduled job to update teams data...')
		try {
			const teams = await fetchTeams()
			await storeTeamsInSupabase(teams)
			console.log('Teams data updated successfully')
		} catch (err) {
			console.error('Failed to update teams data:', err)
		}
	})
}
