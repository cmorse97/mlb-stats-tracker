import axios from 'axios'
import supabase from '../utils/supabaseClient.js'
import dotenv from 'dotenv'

dotenv.config()

const API_URL_TEAMS = process.env.API_URL_TEAMS
const API_KEY = process.env.API_KEY
const API_HOST = process.env.API_HOST

export const fetchTeamsFromAPI = async () => {
	const options = {
		method: 'GET',
		url: API_URL_TEAMS,
		params: {
			teamStats: 'true',
			topPerformers: 'true',
			rosters: 'true'
		},
		headers: {
			'x-rapidapi-key': API_KEY,
			'x-rapidapi-host': API_HOST
		}
	}
	try {
		console.log('Fetching teams data from API...')
		const response = await axios.request(options)
		console.log('API Response:', response)
		return response.data
	} catch (error) {
		console.error('Error fetching teams data from API:', error)
		throw new Error('Failed to fetch teams data from API')
	}
}

export const updateTeamsInSupabase = async () => {
	const teamsData = await fetchTeamsFromAPI()
	const teamsToUpsert = teamsData.body.map(team => ({
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
	console.log('Retrieved teams data from API:', teamsData)
	if (!teamsData) throw new Error('No teams data retrieved from API')

	try {
		const { error } = await supabase.from('teams').upsert(teamsToUpsert, {
			onConflict: ['team_abv']
		})
		if (error) {
			console.error('Error updating Supabase teams data:', error.message)
			throw error
		}
		console.log('Supabase teams data updated successfully')
	} catch (error) {
		console.error('Error updating Supabase teams data:', error.message)
		throw error
	}
}
