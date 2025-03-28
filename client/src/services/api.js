const API_URL = 'http://localhost:3000/api' // backend URL

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
