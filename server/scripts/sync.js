import 'dotenv/config'
import { fetchAllPlayers, storePlayersInSupabase } from '../models/playerModel.js'
import { fetchTeams, storeTeamsInSupabase } from '../models/teamModel.js'

async function sync() {
  console.log('Starting daily sync:', new Date().toISOString())

  console.log('Syncing teams...')
  const teams = await fetchTeams()
  await storeTeamsInSupabase(teams)
  console.log(`Teams synced: ${teams.length} records`)

  console.log('Syncing players...')
  const players = await fetchAllPlayers()
  await storePlayersInSupabase(players)
  console.log(`Players synced: ${players.length} records`)

  console.log('Sync complete:', new Date().toISOString())
}

sync().catch((err) => {
  console.error('Sync failed:', err)
  process.exit(1)
})
