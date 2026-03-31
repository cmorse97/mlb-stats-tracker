import supabase from '../utils/supabaseClient.js'
import axios from 'axios'

const MLB_API = process.env.MLB_API_URL || 'https://statsapi.mlb.com/api/v1'
const SEASON = new Date().getFullYear()

// Fetch all teams with standings data from MLB API
export const fetchTeams = async () => {
	console.log('Fetching teams from MLB API...')

	const [teamsRes, standingsRes] = await Promise.all([
		axios.get(`${MLB_API}/teams`, {
			params: { sportId: 1, season: SEASON }
		}),
		axios.get(`${MLB_API}/standings`, {
			params: { leagueId: '103,104', season: SEASON }
		})
	])

	// Build standings lookup keyed by MLB team ID
	const standingsMap = {}
	for (const division of standingsRes.data.records) {
		for (const record of division.teamRecords) {
			standingsMap[record.team.id] = {
				wins: record.wins,
				losses: record.losses,
				runsScored: record.runsScored ?? 0,
				runsAllowed: record.runsAllowed ?? 0,
				runDiff: record.runDifferential ?? 0
			}
		}
	}

	const teams = teamsRes.data.teams.filter(t => t.active && t.sport?.id === 1)

	return teams.map(team => ({
		mlb_id: team.id,
		name: team.teamName,
		city: team.locationName,
		team_abv: team.abbreviation,
		league: team.league?.name ?? null,
		league_abv: team.league?.id === 103 ? 'AL' : 'NL',
		division: team.division?.name ?? null,
		logo: `https://www.mlbstatic.com/team-logos/${team.id}.svg`,
		wins: standingsMap[team.id]?.wins ?? 0,
		losses: standingsMap[team.id]?.losses ?? 0,
		runs_scored: standingsMap[team.id]?.runsScored ?? 0,
		runs_allowed: standingsMap[team.id]?.runsAllowed ?? 0,
		run_diff: standingsMap[team.id]?.runDiff ?? 0
	}))
}

// Store teams in Supabase
export const storeTeamsInSupabase = async teams => {
	if (!teams?.length) throw new Error('No teams to store')

	const { data, error } = await supabase
		.from('teams')
		.upsert(teams, { onConflict: ['team_abv'] })
		.select()

	if (error) {
		console.error('Error storing teams:', error.message)
		throw error
	}
	return data
}
