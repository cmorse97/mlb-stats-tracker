import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Container, Typography } from '@mui/material'

const TeamStats = () => {
	const [teamData, setTeamData] = useState({})
	const { teamAbv } = useParams()

	useEffect(() => {
		const fetchTeamData = async () => {
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

	return (
		<Container maxWidth='lg' sx={{ margin: 'auto' }}>
			{!Object.keys(teamData).length ? (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				<Box display='flex' gap={4} p={2}>
					<img
						src={teamData.espnLogo1}
						alt={teamData.teamAbv}
						width={124}
						height={108}
					/>

					<Box
						display='flex'
						flexDirection='column'
						justifyContent='center'
						gap={2}
					>
						<Typography variant='h5'>
							{teamData.teamCity} {teamData.teamName}
						</Typography>
						<Typography variant='h6'>
							{teamData.conferenceAbv} {teamData.division}
						</Typography>
						<Typography>
							({teamData.wins} - {teamData.loss})
						</Typography>
					</Box>

					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						flexGrow={1}
						gap={2}
					>
						No 2024 team stats, season starting soon...
					</Box>
				</Box>
			)}
		</Container>
	)
}

export default TeamStats
