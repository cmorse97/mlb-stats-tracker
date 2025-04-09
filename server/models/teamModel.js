import supabase from '../utils/supabaseClient.js'
import axios from 'axios'

const API_URL_TEAMS = process.env.API_URL_TEAMS
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST

// Fetch all teams
export const fetchTeams = async () => {
	console.log('fetching teams...')
	const options = {
		method: 'GET',
		url: API_URL_TEAMS,
		params: {
			teamStats: 'true',
			topPerformers: 'true',
			rosters: 'true'
		},
		headers: {
			'x-rapidapi-key': RAPIDAPI_KEY,
			'x-rapidapi-host': RAPIDAPI_HOST
		}
	}
	try {
		const response = await axios.request(options)
		if (!response || !response.data || !response.data.body) {
			console.error('Error fetching teams:', 'No teams data retrieved from API')
			throw new Error('No teams data retrieved from API')
		}

		const teams = response.data.body
		return teams // Returns teams array of objects
	} catch (err) {
		console.error('Error fetching teams:', err.message)
		throw err
	}
}

// Format teams for supabase
const formatTeams = teams => {
	return teams.map(team => ({
		name: team.teamName,
		city: team.teamCity,
		team_abv: team.teamAbv,
		league: team.conference,
		league_abv: team.conferenceAbv,
		division: team.division,
		logo: team.mlbLogo1,
		wins: team.wins,
		losses: team.loss,
		runs_scored: team.RS,
		runs_allowed: team.RA,
		run_diff: team.DIFF
	}))
}

// Store teams in Supabase
export const storeTeamsInSupabase = async teams => {
	const formattedTeams = formatTeams(teams)

	if (!formattedTeams) {
		console.error('Error formatting teams:', 'No teams data to format')
		throw new Error('No teams data to format')
	}

	const { data, error } = await supabase
		.from('teams')
		.upsert(formattedTeams, {
			onConflict: ['team_abv']
		})
		.select()

	if (error) {
		console.error('Error storing teams data in Supabase:', error.message)
		throw error
	}
	return data
}
