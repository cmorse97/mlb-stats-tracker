import axios from 'axios'
import supabase from '../utils/supabaseClient.js'
import addCalculatedStats from '../utils/statCalculations.js'

const API_URL_TEAMS = process.env.API_URL_TEAMS
const API_URL_ROSTERS = process.env.API_URL_ROSTERS
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST

//  export const fetchTeamsFromAPI = async () => {
// 	const options = {
// 		method: 'GET',
// 		url: API_URL_TEAMS,
// 		params: {
// 			teamStats: 'true',
// 			topPerformers: 'true',
// 			rosters: 'true'
// 		},
// 		headers: {
// 			'x-rapidapi-key': RAPIDAPI_KEY,
// 			'x-rapidapi-host': RAPIDAPI_HOST
// 		}
// 	}
// 	try {
// 		const response = await axios.request(options)

// 		return response.data
// 	} catch (error) {
// 		console.error('Error fetching teams data from API:', error)
// 		throw new Error('Failed to fetch teams data from API')
// 	}
//  }

// export const updateTeamsInSupabase = async () => {
// 	const teamsData = await fetchTeamsFromAPI()
// 	const teamsToUpsert = teamsData.body.map(team => ({
// 		name: team.teamName,
// 		city: team.teamCity,
// 		team_abv: team.teamAbv,
// 		league: team.conference,
// 		league_abv: team.conferenceAbv,
// 		division: team.division,
// 		logo: team.mlbLogo1,
// 		wins: team.wins,
// 		losses: team.loss,
// 		runs_scored: team.RS,
// 		runs_allowed: team.RA,
// 		run_diff: team.DIFF
// 	}))
// 	console.log('Retrieved teams data from API:', teamsData)
// 	if (!teamsData) throw new Error('No teams data retrieved from API')

// 	try {
// 		const { error } = await supabase.from('teams').upsert(teamsToUpsert, {
// 			onConflict: ['team_abv']
// 		})
// 		if (error) {
// 			console.error('Error updating Supabase teams data:', error.message)
// 			throw error
// 		}
// 		console.log('Supabase teams data updated successfully')
// 	} catch (error) {
// 		console.error('Error updating Supabase teams data:', error.message)
// 		throw error
// 	}
// }

// Get roster from API
export const fetchRosterByTeam = async teamAbv => {
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
	} catch (error) {
		console.error('Error fetching team roster:', error)
		throw error
	}
}

// Get all rosters
export const fetchAllRosters = async () => {
	const teams = await fetchTeamsFromAPI()
	const teamsData = teams.body

	for (const team of teamsData) {
		const teamAbv = team.teamAbv
		const rosterByTeam = await fetchRosterByTeam(teamAbv) // Returns roster array

		if (!rosterByTeam || rosterByTeam.length === 0) {
			console.warn(`No roster data retrieved for team: ${teamAbv}`)
			continue
		}

		const formattedRoster = formatRosterData(rosterByTeam, teamAbv)
		console.log(formattedRoster)
		await updateRostersInSupabase(formattedRoster)
	}
}

// Format rosters for supabase schema
export const formatRosterData = (roster, teamAbv) => {
	const playersToUpsert = roster.map(player => {
		if (!player || !player.playerID) {
			console.error('Invalid player data:', player)
			return null // Skip invalid player
		}

		// Calculate additional stats
		const updatedPlayer = addCalculatedStats(player)

		// Format player data for Supabase
		const formattedPlayer = {
			player_id: updatedPlayer.playerID,
			name: updatedPlayer.longName,
			position: updatedPlayer.pos,
			team_id: updatedPlayer.teamID,
			bday: updatedPlayer.bDay || null,
			jersey_number: updatedPlayer.jerseyNum || null,
			bats: updatedPlayer.bat || null,
			height: updatedPlayer.height || null,
			avatar: updatedPlayer.mlbHeadshot || null,
			throws: updatedPlayer.throw || null,
			weight: updatedPlayer.weight || null,
			team_abv: teamAbv,
			stats: updatedPlayer.stats ? JSON.stringify(updatedPlayer.stats) : null
		}

		// Ensure no undefined values exist
		return Object.fromEntries(
			Object.entries(formattedPlayer).map(([key, value]) => [
				key,
				value ?? null
			])
		)
	})

	// Filter out any null players
	return playersToUpsert.filter(player => player !== null)
}

// Update Rosters in Supabase
export const updateRostersInSupabase = async formattedRoster => {
	try {
		console.log(
			'Formatted Data to Upsert:',
			JSON.stringify(formattedRoster, null, 2)
		)

		const { error } = await supabase.from('players').upsert(formattedRoster, {
			onConflict: ['player_id']
		})
		if (error) {
			console.error('Error updating Supabase rosters data:', error.message)
			throw error
		}
		console.log('Supabase rosters data updated successfully')
	} catch (error) {
		console.error('Error updating Supabase rosters data:', error.message)
		throw error
	}
}
