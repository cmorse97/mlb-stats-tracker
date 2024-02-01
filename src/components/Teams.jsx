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
			<div className='container flex flex-wrap gap-12 justify-center items-center'>
				{teamData.map(team => (
					<div
						key={team.teamID}
						className='flex flex-col justify-center items-center gap-2 text-sm'
					>
						<img
							src={team.mlbLogo1}
							alt={`${team.teamCity} ${team.teamName}`}
							className='md:h-12 md:w-12 h-8 w-8'
						/>
						<p>{team.teamName}</p>
					</div>
				))}
			</div>
		</>
	)
}

export default Teams
