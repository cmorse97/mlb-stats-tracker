import supabase from '../utils/supabaseClient.js'

// Get all teams from supabase
export const getAllTeams = async (req, res) => {
	try {
		const { data, error } = await supabase.from('teams').select()
		if (error) throw error
		res.status(200).json(data)
	} catch (error) {
		console.error('Error fetching teams:', error)
		res.status(500).json({ error: 'Error fetching teams' })
	}
}

export const getTeamByTeamAbv = async (req, res) => {
	try {
		const teamAbv = req.params.teamAbv
		const { data, error } = await supabase
			.from('teams')
			.select()
			.eq('team_abv', teamAbv)
		if (error) throw error
		res.status(200).json(data)
	} catch (error) {
		console.error('Error fetching team:', error)
		res.status(500).json({ error: 'Error fetching team' })
	}
}
