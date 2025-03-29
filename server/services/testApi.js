import axios from 'axios'
import { fetchTeamsFromAPI } from './apiService.js'

const API_URL_ROSTERS = process.env.API_URL_ROSTERS
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST

const fetchRosterByTeam = async teamAbv => {
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
		console.log(
			`API Response for team ${teamAbv}:`,
			JSON.stringify(response.data, null, 2)
		)

		if (!response.data || !response.data.body || !response.data.body.roster) {
			console.warn(`No roster data retrieved for team: ${teamAbv}`)
			return null
		}

		return response.data.body.roster
	} catch (error) {
		console.error(`Error fetching roster for team ${teamAbv}:`, error)
		return null
	}
}

const getAllRosters = async (req, res) => {
	try {
		const teams = await fetchTeamsFromAPI()
		const teamsData = teams.body

		console.log('Retrieved teams data from API:', teamsData)

		if (!teamsData || teamsData.length === 0) {
			console.error('No teams retrieved from API')
			return res.status(500).json({ error: 'No teams retrieved from API' })
		}

		console.log('Retrieved teams data from API:')

		for (const team in teamsData) {
			const team_abv = teamsData[team].teamAbv
			console.log(`Fetching roster for team: ${team_abv}`)
			const roster = await fetchRosterByTeam(team_abv)

			if (!roster || roster.length === 0) {
				console.warn(`No roster data retrieved for team: ${team_abv}`)
				continue
			}

			console.log(`Fetched roster for ${team_abv}:`, roster)
			const formattedRoster = formatRosterData(roster, team_abv)
			await updateRostersInSupabase(formattedRoster)
		}

		console.log('Rosters data updated successfully')
		res.status(200).json({ message: 'Rosters data updated successfully' })
	} catch (error) {
		console.error('Error fetching and storing rosters:', error)
		res.status(500).json({ error: 'Error fetching and storing rosters' })
	}
}

// fetchRosterByTeam('HOU')
getAllRosters()
