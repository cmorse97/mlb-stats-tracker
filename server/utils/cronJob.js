import cron from 'node-cron'
import { updateTeamsInSupabase } from '../services/apiService.js'

cron.schedule(
	'0 0 * * *',
	async () => {
		console.log('Running cron job to update Supabase data')
		await updateTeamsInSupabase()
	},
	{
		scheduled: true,
		timezone: 'America/Chicago'
	}
)

console.log('Cron job scheduled to run every 24 hours')

export default cron
