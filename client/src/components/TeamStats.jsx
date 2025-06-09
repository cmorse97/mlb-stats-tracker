import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTeamByTeamAbv } from '../services/api'
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
				const response = await fetchTeamByTeamAbv(teamAbv)

				if (response !== null) setTeamData(response)
			} catch (error) {
				console.error('Error fetching team:', error)
			}
		}

		fetchTeamData(teamAbv)
	}, [teamAbv])

	const {
		city,
		name,
		runs_allowed,
		runs_scored,
		logo,
		league_abv,
		division,
		wins,
		losses
	} = teamData

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
					<Grid size={{ xs: 12, md: 4 }}>
						<Box display='flex' justifyContent='center'>
							<img
								src={logo}
								alt={`${city} ${name}`}
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
					<Grid size={{ xs: 6, md: 4 }}>
						<Box
							py={4}
							display='flex'
							flexDirection='column'
							alignItems='center'
							textAlign='center'
						>
							<Typography variant='h5' gutterBottom>
								{city} {name}
							</Typography>
							<Typography variant='h6' gutterBottom color='text.secondary'>
								{league_abv} {division}
							</Typography>
							<Typography variant='body1'>
								({wins} - {losses})
							</Typography>
						</Box>
					</Grid>

					{/* Team Stats */}
					<Grid size={{ xs: 6, md: 4 }}>
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
								<Typography component='strong'>{runs_scored}</Typography>
							</Typography>
							<Typography variant='body1'>
								Runs Allowed:{' '}
								<Typography component='strong'>{runs_allowed}</Typography>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default TeamStats
