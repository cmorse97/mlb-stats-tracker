import supabase from '../utils/supabaseClient.js'
import axios from 'axios'

const MLB_API = process.env.MLB_API_URL || 'https://statsapi.mlb.com/api/v1'
const SEASON = new Date().getFullYear()

// Fetch active roster for a single team, with player details hydrated
const fetchRosterByTeamId = async (teamId, teamAbv) => {
	try {
		const res = await axios.get(`${MLB_API}/teams/${teamId}/roster`, {
			params: {
				rosterType: 'active',
				season: SEASON,
				hydrate: 'person(birthDate,height,weight,batSide,pitchHand)'
			}
		})
		return (res.data.roster || []).map(entry => ({
			...entry,
			_teamId: teamId,
			_teamAbv: teamAbv
		}))
	} catch (err) {
		console.error(`Error fetching roster for team ${teamAbv}:`, err.message)
		return []
	}
}

// Fetch season stats for all players in a given group (hitting or pitching)
// Returns a map of { [playerId]: statObject }
const fetchBatchStats = async group => {
	console.log(`Fetching all ${group} stats from MLB API...`)
	const res = await axios.get(`${MLB_API}/stats`, {
		params: {
			stats: 'season',
			group,
			season: SEASON,
			playerPool: 'All',
			sportId: 1,
			limit: 2000
		}
	})

	const statsMap = {}
	const splits = res.data.stats?.[0]?.splits || []
	for (const split of splits) {
		const playerId = split.player?.id
		if (playerId) statsMap[playerId] = split.stat
	}
	return statsMap
}

// Fetch all active players across all 30 MLB teams
export const fetchAllPlayers = async () => {
	console.log('Fetching all players...')

	// Get all active MLB teams to build teamId → teamAbv mapping
	const teamsRes = await axios.get(`${MLB_API}/teams`, {
		params: { sportId: 1, season: SEASON }
	})
	const teams = teamsRes.data.teams.filter(t => t.active && t.sport?.id === 1)

	// Fetch all 30 rosters + hitting/pitching stats in parallel
	const [rosterEntries, hittingStats, pitchingStats] = await Promise.all([
		Promise.all(
			teams.map(t => fetchRosterByTeamId(t.id, t.abbreviation))
		).then(rosters => rosters.flat()),
		fetchBatchStats('hitting'),
		fetchBatchStats('pitching')
	])

	// Merge roster data with stats by player ID
	return rosterEntries.map(entry => {
		const person = entry.person
		const playerId = person.id
		return {
			player_id: playerId,
			name: person.fullName,
			position: entry.position?.abbreviation ?? null,
			team_id: entry._teamId,
			team_abv: entry._teamAbv,
			bday: person.birthDate ?? null,
			jersey_number: entry.jerseyNumber ?? null,
			bats: person.batSide?.code ?? null,
			throws: person.pitchHand?.code ?? null,
			height: person.height ?? null,
			weight: person.weight ? String(person.weight) : null,
			avatar: `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`,
			stats: {
				Hitting: hittingStats[playerId] ?? null,
				Pitching: pitchingStats[playerId] ?? null
			}
		}
	})
}

// Store players in Supabase
export const storePlayersInSupabase = async players => {
	if (!players?.length) {
		console.error('No players to store')
		return
	}

	const { data, error } = await supabase
		.from('players')
		.upsert(players, { onConflict: ['player_id'] })
		.select()

	if (error) {
		console.error('Error storing players:', error.message)
		throw error
	}
	return data
}
