import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import axios from 'axios'

const Teams = () => {
	const [teamsData, setTeamsData] = useState([])

	useEffect(() => {
		const fetchTeamsData = async () => {
			axios
				.get(apiUrl, options)
				.then(response => {
					const teams = response.data.body
					setTeamsData(teams)
				})
				.catch(err => console.log(err))
		}

		fetchTeamsData()
	}, [])

	const options = {
		params: {
			teamStats: 'true',
			topPerformers: 'true'
		},
		headers: {
			'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
			'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
		}
	}

	const apiUrl = import.meta.env.VITE_API_URL_TEAMS

	return (
		<>
			<div className='container flex flex-wrap items-center justify-center gap-12'>
				{!teamsData.length ? (
					<CircularProgress />
				) : (
					teamsData.map(team => (
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
