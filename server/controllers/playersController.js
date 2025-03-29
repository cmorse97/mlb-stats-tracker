import supabase from '../utils/supabaseClient.js'

// Get all players from supabase
export const getAllPlayers = async (req, res) => {
	try {
		const { data, error } = await supabase.from('players').select()
		if (error) throw error
		res.status(200).json(data)
	} catch (error) {
		console.error('Error fetching all players:', error)
		res.status(500).json({ error: 'Error fetching all players' })
	}
}

// Get a single player from supabase by player_id
export const getPlayerById = async (req, res) => {
	try {
		const playerId = parseInt(req.params.playerId, 10)
		console.log('Requested player ID:', playerId)

		const { data, error } = await supabase
			.from('players')
			.select()
			.eq('player_id', playerId)
			.single()

		if (error) throw error
		res.status(200).json(data)
	} catch (error) {
		console.error(`Error fetching player:`, error)
		res.status(500).json({ error: `Error fetching player.` })
	}
}
