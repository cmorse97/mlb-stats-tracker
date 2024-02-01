import { useState, useEffect } from 'react'
import axios from 'axios'

const Teams = () => {
	const [teamData, setTeamData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get(apiUrl, options)
				.then(response => setTeamData(response.data.body))
				.catch(err => console.log(err))
		}

		fetchData()
	}, [])

	const options = {
		params: {
			teamStats: 'true',
			topPerformers: 'true'
		},
		headers: {
			'X-RapidAPI-Key': 'e700ebd9b9msh3c341d7598dfff4p170c1bjsnce6a07dfd2eb',
			'X-RapidAPI-Host':
				'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
		}
	}

	const apiUrl =
		'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeams'

	return (
		<>
			<ul>
				{teamData.map(team => (
					<li key={team.teamID}>{`${team.teamCity} ${team.teamName}`}</li>
				))}
			</ul>
		</>
	)
}

export default Teams
