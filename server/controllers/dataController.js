import { fetchTeams, storeTeamsInSupabase } from '../models/teamModel.js'
import {
	fetchAllPlayers,
	storePlayersInSupabase
} from '../models/playerModel.js'

export const updateTeams = async (req, res) => {
	try {
		const teams = await fetchTeams()
		const savedTeams = await storeTeamsInSupabase(teams)
		res.status(200).json({ message: 'Teams updated', data: savedTeams })
	} catch (error) {
		console.error('Error updating teams:', error.message)
		res.status(500).json({ error: 'Failed to update teams' })
	}
}

export const updateRosters = async (req, res) => {
	try {
		const players = await fetchAllPlayers()
		const savedPlayers = await storePlayersInSupabase(players)
		res.status(200).json({ message: 'Rosters updated', data: savedPlayers })
	} catch (error) {
		console.error('Error updating rosters:', error.message)
		res.status(500).json({ error: 'Failed to update rosters' })
	}
}
