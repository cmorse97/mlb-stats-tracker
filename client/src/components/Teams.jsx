import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress, Container, Box, Grow, Grid } from '@mui/material'
import { fetchTeams } from '../services/api'
const Teams = () => {
	const [teamsData, setTeamsData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getTeams = async () => {
			const data = await fetchTeams()
			setTeamsData(data)
			setLoading(false)
		}

		getTeams()
	}, [])

	if (loading) {
		return (
			<Container maxWidth='lg'>
				<Box
					display='flex'
					flexDirection='column'
					gap={2}
					marginTop={16}
					justifyContent='center'
					alignItems='center'
				>
					<CircularProgress />
				</Box>
			</Container>
		)
	}

	return (
		<Container maxWidth='lg'>
			<Grid container justifyContent='center' alignItems='center' spacing={2}>
				{teamsData.map(({ team_abv, city, name, logo }) => (
					<Grow in={true} timeout={1000} key={team_abv}>
						<Grid item size={{ xs: 4, sm: 2, md: 2 }}>
							<Grid
								container
								justifyContent='center'
								alignItems='center'
								sx={{ height: '100%' }}
							>
								<Link to={`/teams/${team_abv}`} style={{}}>
									<Box
										p={2}
										sx={{
											borderRadius: '50%',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											height: '100px',
											width: '100px',
											overflow: 'hidden', // Hide overflow to prevent image stretching
											// add a hover effect for lg screen sizes only
											'&:hover': {
												transform: 'scale(1.1)',
												transition: 'transform 0.5s ease-out'
											}
										}}
									>
										<img
											src={logo}
											alt={`${city} ${name}`}
											style={{
												maxWidth: '100%',
												maxHeight: '100%',
												objectFit: 'cover'
											}} // Maintain aspect ratio and cover entire box
										/>
									</Box>
								</Link>
							</Grid>
						</Grid>
					</Grow>
				))}
			</Grid>
		</Container>
	)
}

export default Teams
