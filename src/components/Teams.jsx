import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress, Container, Box, Paper, Grid } from '@mui/material'
import { supabase } from '../utils/supabase'
const Teams = () => {
	const [teamsData, setTeamsData] = useState([])

	useEffect(() => {
		const fetchTeamsData = async () => {
			const { data: teams, error } = await supabase.from('teams').select()

			if (error) {
				console.error('Error fetching teams data:', error)
				return
			}

			setTeamsData(teams)
		}
		fetchTeamsData()
	}, [])

	return (
		<Container maxWidth='lg'>
			<Grid container spacing={2} mx='auto'>
				{!teamsData.length ? (
					<Box mx='auto'>
						<CircularProgress />
					</Box>
				) : (
					teamsData.map(team => (
						<Grid item xs={6} sm={3} md={2} key={team.id}>
							<Link to={`/team/${team.team_abv}`}>
								<Box
									p={2}
									component={Paper}
									sx={{
										borderRadius: '50%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '100px',
										width: '100px',
										overflow: 'hidden' // Hide overflow to prevent image stretching
									}}
								>
									<img
										src={team.logo}
										alt={`${team.city} ${team.name}`}
										style={{
											maxWidth: '100%',
											maxHeight: '100%',
											objectFit: 'cover'
										}} // Maintain aspect ratio and cover entire box
									/>
								</Box>
							</Link>
						</Grid>
					))
				)}
			</Grid>
		</Container>
	)
}

export default Teams
