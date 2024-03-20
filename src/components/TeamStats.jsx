import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'

const TeamStats = () => {
	const [teamData, setTeamData] = useState({})
	const { teamAbv } = useParams()

	useEffect(() => {
		const fetchTeamData = async () => {
			axios
				.get(apiUrl, options)
				.then(response => {
					const teams = response.data.body
					const team = teams.find(team => team.teamAbv === teamAbv)
					setTeamData(team)
				})
				.catch(err => console.log(err))
		}

		fetchTeamData()
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
		<div className='container mx-auto my-8'>
			{!Object.keys(teamData).length ? (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				<div className='flex gap-8 p-2 border border-black'>
					<img
						src={teamData.espnLogo1}
						alt={teamData.teamAbv}
						width={108}
						height={108}
					/>

					<div className='flex flex-col justify-center gap-2'>
						<h3>
							{teamData.teamCity} {teamData.teamName}
						</h3>
						<p>
							{teamData.conferenceAbv} {teamData.division}
						</p>
						<p>
							({teamData.wins} - {teamData.loss})
						</p>
					</div>

					<div className='flex items-center justify-center flex-1 gap-2 border border-red-50'>
						No 2024 team stats, season starting soon...
					</div>
				</div>
			)}
		</div>
	)
}

export default TeamStats
