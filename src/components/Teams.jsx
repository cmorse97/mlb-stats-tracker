import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import axios from 'axios'

const Teams = () => {
	const [teamData, setTeamData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get(apiUrl, options)
				.then(response => {
					const teams = response.data.body
					setTeamData(teams)
				})
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
			<div className='container flex flex-wrap items-center justify-center gap-12'>
				{!teamData.length ? (
					<CircularProgress />
				) : (
					teamData.map(team => (
						<Link to={`/team/${team.teamAbv}`} key={team.teamID}>
							<div className='flex flex-col items-center justify-center gap-2 text-sm'>
								<img
									src={team.mlbLogo1}
									alt={`${team.teamCity} ${team.teamName}`}
									className='w-8 h-8 md:h-12 md:w-12'
								/>
								<p>{team.teamName}</p>
							</div>
						</Link>
					))
				)}
			</div>
		</>
	)
}

export default Teams
