import supabase from '../utils/supabaseClient.js'

export const getAllTeams = async (req, res) => {
	try {
		const { data: teams, error } = await supabase
			.from('teams')
			.select()
			.order('id', { ascending: true })

		if (error) throw error

		res.status(200).json({
			statusCode: 200,
			message: 'Teams fetched successfully',
			body: teams
		})
	} catch (err) {
		console.error('Error fetching teams:', err)
		res
			.status(500)
			.json({ message: 'Failed to fetch teams', error: err.message })
	}
}

export const getTeamByTeamAbv = async (req, res) => {
	const teamAbv = req.params.teamAbv.toUpperCase()
	try {
		const { data: team, error } = await supabase
			.from('teams')
			.select()
			.eq('team_abv', teamAbv)
			.single()

		if (error) throw error

		res.status(200).json({
			statusCode: 200,
			message: `Team data for ${teamAbv} fetched successfully`,
			body: team
		})
	} catch (err) {
		console.error(`Error fetching team data for ${teamAbv}:`, err)
		res.status(500).json({
			message: `Failed to fetch team data for ${teamAbv}`,
			error: err.message
		})
	}
}

export const getRosterByTeamAbv = async (req, res) => {
	const teamAbv = req.params.teamAbv.toUpperCase()
	try {
		const { data: roster, error } = await supabase
			.from('players')
			.select()
			.eq('team_abv', teamAbv)
			.order('name', { ascending: true })

		if (error) throw error

		res.status(200).json({
			statusCode: 200,
			message: `Roster for ${teamAbv} fetched successfully`,
			body: roster
		})
	} catch (err) {
		console.error(`Error fetching roster for ${teamAbv}:`, err)
		res.status(500).json({
			message: `Failed to fetch roster for ${teamAbv}`,
			error: err.message
		})
	}
}
