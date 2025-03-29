const API_URL = import.meta.env.VITE_API_URL

// Get teams from backend
export const fetchTeams = async () => {
	try {
		console.log('Fetching teams data from API...')
		const response = await fetch(`${API_URL}/teams`)
		if (!response.ok) throw new Error('Failed to fetch teams data from API')
		console.log(response)
		return await response.json()
	} catch (error) {
		console.error('Error fetching teams data from API:', error.message)
		return []
	}
}

// Get a team by teamAbv from backend
export const fetchTeam = async teamAbv => {
	try {
		const response = await fetch(`${API_URL}/teams/${teamAbv}`)
		if (!response.ok) throw new Error('Failed to fetch team')
		return await response.json()
	} catch (error) {
		console.error('Error fetching team:', error)
		return []
	}
}

// Get roster by teamAbv from backend
export const fetchTeamRoster = async teamAbv => {
	try {
		const response = await fetch(`${API_URL}/teams/${teamAbv}/roster`)
		if (!response.ok) throw new Error('Failed to fetch team roster')
		return await response.json()
	} catch (error) {
		console.error('Error fetching team roster:', error)
		return []
	}
}
