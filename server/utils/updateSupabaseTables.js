import cron from 'node-cron'
import {
	fetchAllPlayers,
	storePlayersInSupabase
} from '../models/playerModel.js'

import { fetchTeams, storeTeamsInSupabase } from '../models/teamModel.js'

export const updatePlayers = () => {
	// Run this job once every 24 hours at 03:00
	try {
		cron.schedule(
			'0 3 * * *',
			async () => {
				console.log('Running scheduled job to update players data...')
				const players = await fetchAllPlayers()
				await storePlayersInSupabase(players)
				console.log('Players data updated successfully')
			},
			{
				scheduled: true,
				timeZone: 'America/New_York'
			}
		)
	} catch (err) {
		console.error('Failed to update players data:', err)
	}
}

export const updateTeams = () => {
	// Run this job once every 24 hours at 03:00
	try {
		cron.schedule(
			'0 3 * * *',
			async () => {
				console.log('Running scheduled job to update teams data...')
				const teams = await fetchTeams()
				await storeTeamsInSupabase(teams)
				console.log('Teams data updated successfully')
			},
			{
				scheduled: true,
				timeZone: 'America/New_York'
			}
		)
	} catch (err) {
		console.error('Failed to update teams data:', err)
	}
}
