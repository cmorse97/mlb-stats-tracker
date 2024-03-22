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
							sx={{ border: '2px solid blue' }}
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
								border: '2px solid black',
								alignItems: { xs: 'center', md: 'flex-start' }, // Center on xs screens, align flex-start on md screens
								justifyContent: { xs: 'center', md: 'flex-start' } // Center on xs screens, align flex-start on md screens
							}}
						>
							<Typography variant='subtitle1'>
								{teamData.teamCity} {teamData.teamName}
							</Typography>
							<Typography variant='subtitle2'>
								{teamData.conferenceAbv} {teamData.division}
							</Typography>
							<Typography variant='body1'>
								({teamData.wins} - {teamData.loss})
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={8}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={4}>
								<Box
									display='flex'
									flexWrap='wrap'
									alignItems='center'
									justifyContent='center'
									gap={2}
									py={2}
									sx={{ border: '2px solid red' }}
								>
									<Typography>Pitching</Typography>
									<Typography>Runs Allowed</Typography>
									<Typography>Team ERA</Typography>
									<Typography>Team WHIP</Typography>
									<Typography>Hits</Typography>
									<Typography>HR</Typography>
									<Typography>Saves</Typography>
									<Typography>Blown Saves</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Box
									display='flex'
									flexWrap='wrap'
									alignItems='center'
									justifyContent='center'
									gap={2}
									py={2}
									sx={{ border: '2px solid red' }}
								>
									<Typography>Hitting</Typography>
									<Typography>Runs Scored</Typography>
									<Typography>Team AVG</Typography>
									<Typography>Hits</Typography>
									<Typography>HR</Typography>
									<Typography>SO</Typography>
									<Typography>Team SLG</Typography>
									<Typography>Team OBP</Typography>
									<Typography>Team OPS</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Box
									display='flex'
									flexWrap='wrap'
									alignItems='center'
									justifyContent='center'
									gap={2}
									py={2}
									sx={{ border: '2px solid red' }}
								>
									<Typography>Fielding and Baserunning</Typography>
									<Typography>Errors</Typography>
									<Typography>Stolen bases</Typography>
									<Typography>Caught stealing</Typography>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default TeamStats
