import supabase from '../utils/supabaseClient.js'
import axios from 'axios'
import { fetchTeams } from './teamModel.js'
import addCalculatedStats from '../utils/statCalculations.js'

const API_URL_ROSTERS = process.env.API_URL_ROSTERS
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST

// Fetch all players from all teams
export const fetchAllPlayers = async () => {
	console.log('Fetching all players...')
	const teams = await fetchTeams()

	let allPlayers = []

	for (const team of teams) {
		const teamAbv = team.teamAbv
		const playersByTeam = await fetchPlayersByTeam(teamAbv)
		if (playersByTeam && Array.isArray(playersByTeam)) {
			const enrichedPlayers = playersByTeam.map(player => {
				const calculated = addCalculatedStats(player)
				return { ...calculated, teamAbv }
			})
			allPlayers.push(...enrichedPlayers)
		}
	}

	return allPlayers
}

// Fetch players by team
export const fetchPlayersByTeam = async teamAbv => {
	console.log('Fetching players for team:', teamAbv)
	const options = {
		method: 'GET',
		url: API_URL_ROSTERS,
		params: {
			teamAbv: teamAbv,
			getStats: 'true'
		},
		headers: {
			'x-rapidapi-key': RAPIDAPI_KEY,
			'x-rapidapi-host': RAPIDAPI_HOST
		}
	}

	try {
		const response = await axios.request(options)
		return response.data.body.roster
	} catch (err) {
		console.error('Error fetching players:', err)
		return []
	}
}

// Format players for Supabase
export const formatPlayers = players => {
	return players.map(player => {
		if (player.stats) {
			player = addCalculatedStats(player)
		}

		return {
			player_id: player.playerID,
			name: player.longName,
			position: player.pos,
			team_id: player.teamID,
			bday: player.bDay,
			jersey_number: player.jerseyNum,
			bats: player.bat,
			height: player.height,
			avatar: player.mlbHeadshot,
			throws: player.throw,
			weight: player.weight,
			team_abv: player.teamAbv, // included from enriched step
			stats: player.stats || null // store as JSON object (jsonb in Supabase)
		}
	})
}

// Store players in Supabase
export const storePlayersInSupabase = async players => {
	const formattedPlayers = formatPlayers(players)

	if (!formattedPlayers.length) {
		console.error('No players to store')
		return
	}

	const { data, error } = await supabase
		.from('players')
		.upsert(formattedPlayers, {
			onConflict: ['player_id']
		})
		.select()

	if (error) {
		console.error('Error storing players data in Supabase:', error.message)
		throw error
	}
	return data
}
