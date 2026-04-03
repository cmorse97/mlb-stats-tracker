/**
 * Cron job integration test
 * Runs the exact same functions the daily cron jobs call and reports results.
 * Usage: node tools/testCronJobs.js
 */

import '../utils/supabaseClient.js' // ensures dotenv is loaded via supabaseClient
import { fetchTeams, storeTeamsInSupabase } from '../models/teamModel.js'
import { fetchAllPlayers, storePlayersInSupabase } from '../models/playerModel.js'

const run = async (label, fn) => {
	console.log(`\n▶ ${label}`)
	const start = Date.now()
	try {
		const result = await fn()
		const elapsed = ((Date.now() - start) / 1000).toFixed(2)
		console.log(`  ✓ Done in ${elapsed}s — ${result?.length ?? 0} records`)
		return result
	} catch (err) {
		console.error(`  ✗ FAILED: ${err.message}`)
		process.exit(1)
	}
}

console.log('=== Cron Job Integration Test ===')
console.log(`Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET\n`)

const teams = await run('fetchTeams()          — MLB API → memory', fetchTeams)
await run('storeTeamsInSupabase() — memory → Supabase', () => storeTeamsInSupabase(teams))

const players = await run('fetchAllPlayers()      — MLB API → memory', fetchAllPlayers)
await run('storePlayersInSupabase() — memory → Supabase', () => storePlayersInSupabase(players))

console.log('\n=== All cron job steps passed ✓ ===')
