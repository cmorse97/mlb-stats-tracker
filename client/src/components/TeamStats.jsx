import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTeam } from '../services/api'
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
		const fetchTeamData = async teamAbv => {
			try {
				const response = await fetchTeam(teamAbv)
				const teamObj = response.length > 0 ? response[0] : null

				setTeamData(teamObj)
				console.log(teamObj)
			} catch (error) {
				console.error('Error fetching team:', error)
			}
		}

		fetchTeamData(teamAbv)
	}, [teamAbv])

	return (
		<Container maxWidth='lg'>
			{!teamData ? (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				<Grid
					container
					spacing={{ xs: 2, md: 0 }}
					my={4}
					alignItems='center'
					justifyContent='center'
				>
					{/* Team Logo */}
					<Grid item size={{ xs: 12, md: 4 }}>
						<Box display='flex' justifyContent='center'>
							<img
								src={teamData.logo}
								alt={teamData.teamAbv}
								style={{
									width: '80%',
									maxWidth: '200px',
									height: 'auto',
									objectFit: 'contain'
								}}
							/>
						</Box>
					</Grid>

					{/* Team Info */}
					<Grid item size={{ xs: 6, md: 4 }}>
						<Box
							py={4}
							display='flex'
							flexDirection='column'
							alignItems='center'
							textAlign='center'
						>
							<Typography variant='h5' gutterBottom>
								{teamData.city} {teamData.name}
							</Typography>
							<Typography variant='h6' gutterBottom color='text.secondary'>
								{teamData.league_abv} {teamData.division}
							</Typography>
							<Typography variant='body1'>
								({teamData.wins} - {teamData.losses})
							</Typography>
						</Box>
					</Grid>

					{/* Team Stats */}
					<Grid item size={{ xs: 6, md: 4 }}>
						<Box
							textAlign='center'
							py={4}
							display='flex'
							flexDirection='column'
							alignItems='center'
						>
							<Typography variant='h5' gutterBottom>
								Team Stats
							</Typography>
							<Typography variant='body1'>
								Runs Scored:{' '}
								<Typography component='strong'>
									{teamData.runs_scored}
								</Typography>
							</Typography>
							<Typography variant='body1'>
								Runs Allowed:{' '}
								<Typography component='strong'>
									{teamData.runs_allowed}
								</Typography>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default TeamStats
