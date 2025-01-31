import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

const fetchTeamRoster = async teamAbv => {
	const options = {
		method: 'GET',
		url: process.env.VITE_API_URL_TEAM_ROSTER,
		params: {
			teamAbv: teamAbv,
			getStats: 'true'
		},
		headers: {
			'x-rapidapi-key': process.env.VITE_API_KEY,
			'x-rapidapi-host': process.env.VITE_API_HOST
		}
	}

	try {
		const response = await axios.request(options)
		console.log('API Response:', response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching team roster:', error)
		throw error
	}
}

const fetchAllTeamsRosters = async () => {
	const teams = [
		'ARI',
		'ATL',
		'BAL',
		'BOS',
		'CHC',
		'CHW',
		'CIN',
		'CLE',
		'COL',
		'DET',
		'HOU',
		'KC',
		'LAA',
		'LAD',
		'MIA',
		'MIL',
		'MIN',
		'NYM',
		'NYY',
		'OAK',
		'PHI',
		'PIT',
		'SD',
		'SF',
		'SEA',
		'STL',
		'TB',
		'TEX',
		'TOR',
		'WAS'
	]
	const allPlayers = []

	for (const teamAbv of teams) {
		try {
			const rosterData = await fetchTeamRoster(teamAbv)
			const players = extractPlayersFromRosters(rosterData)
			allPlayers.push(...players)
			await new Promise(resolve => setTimeout(resolve, 1000))
		} catch (error) {
			console.error(`Error fetching roster for team ${teamAbv}:`, error)
		}

		return allPlayers
	}
}

const extractPlayersFromRosters = rosterData => {
	const players = []

	if (!rosterData.body || !Array.isArray(rosterData.body.roster)) {
		throw new Error(
			'Invalid API response format: Expected an array of players in roster'
		)
	}

	rosterData.body.roster.forEach(player => {
		if (!player.playerID || !player.longName || !player.pos) {
			console.warn('Invalid player data:', player)
			return
		}

		const playerData = {
			name: player.longName,
			team: player.team,
			team_id: player.teamID,
			position: player.pos,
			bday: player.bDay,
			jersey_number: player.jerseyNum,
			bats: player.bat,
			height: player.height,
			avatar: player.mlbHeadshot,
			throws: player.throw,
			stats: player.stats
		}

		console.log('Player data:', playerData)
		players.push(playerData)
	})

	return players
}

const insertPlayersData = async players => {
	try {
		const { data, error } = await supabase.from('players').insert(players)

		if (error) {
			console.error('Error inserting players data:', error)
		} else {
			console.log('Players data inserted successfully:', data)
		}
	} catch (error) {
		console.error('Error inserting players data:', error)
	}
}

const populatePlayersTable = async () => {
	try {
		const allPlayers = await fetchAllTeamsRosters()
		await insertPlayersData(allPlayers)
	} catch (error) {
		console.error('Error populating players data:', error.message)
	}
}

populatePlayersTable()
