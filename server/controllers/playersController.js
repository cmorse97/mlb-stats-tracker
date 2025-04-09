import supabase from '../utils/supabaseClient.js'

export const getAllPlayers = async (req, res) => {
	try {
		const { data: players, error } = await supabase
			.from('players')
			.select()
			.order('player_id', { ascending: true })

		if (error) throw error

		res.status(200).json({
			statusCode: 200,
			message: 'Players fetched successfully',
			body: players
		})
	} catch (err) {
		console.error('Error fetching players:', err)
		res
			.status(500)
			.json({ message: 'Failed to fetch players', error: err.message })
	}
}

export const getPlayerById = async (req, res) => {
	try {
		const playerId = req.params.playerId
		const { data: player, error } = await supabase
			.from('players')
			.select()
			.eq('player_id', playerId)
			.single()

		if (error) throw error

		res.status(200).json({
			statusCode: 200,
			message: 'Player fetched successfully',
			body: player
		})
	} catch (err) {
		console.error('Error fetching player:', err)
		res
			.status(500)
			.json({ message: 'Failed to fetch player', error: err.message })
	}
}
