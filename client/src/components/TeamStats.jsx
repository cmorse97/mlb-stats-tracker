import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
	Box,
	CircularProgress,
	Container,
	Typography,
	Grid
} from '@mui/material'

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
					console.log(team)
					setTeamData(team)
				})
				.catch(err => console.log(err))
		}

		fetchTeamData()
	}, [])

	return (
		<Container maxWidth='lg'>
			{!Object.keys(teamData).length ? (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				<Grid container spacing={2} my={2}>
					<Grid item xs={12} sm={6} md={2}>
						<Box
							display='flex'
							justifyContent='center'
							height='100%' // Ensure the Box takes full height of the Grid item
						>
							<img
								src={teamData.espnLogo1}
								alt={teamData.teamAbv}
								width='100%' // Make the image responsive
								height='auto' // Maintain aspect ratio
							/>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6} md={2}>
						<Box
							item
							xs={12}
							md={6}
							py={4}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: { xs: 'center', md: 'flex-start' }, // Center on xs screens, align flex-start on md screens
								justifyContent: { xs: 'center', md: 'flex-start' } // Center on xs screens, align flex-start on md screens
							}}
						>
							<Typography variant='h5'>
								{teamData.teamCity} {teamData.teamName}
							</Typography>
							<Typography variant='h6'>
								{teamData.conferenceAbv} {teamData.division}
							</Typography>
							<Typography variant='body1'>
								({teamData.wins} - {teamData.loss})
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={8}>
						<Typography textAlign='center' variant='h6'>
							Team Stats
						</Typography>
						<Box textAlign='center'>
							<Typography>
								Runs Scored: <strong>{teamData.RS}</strong>
							</Typography>
							<Typography>
								Runs Allowed: <strong>{teamData.RA}</strong>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default TeamStats
