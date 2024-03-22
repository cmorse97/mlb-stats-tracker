import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress, Container, Box, Paper, Grid } from '@mui/material'
import axios from 'axios'

const Teams = () => {
	const [teamsData, setTeamsData] = useState([])

	useEffect(() => {
		const fetchTeamsData = async () => {
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
					setTeamsData(teams)
				})
				.catch(err => console.log(err))
		}

		fetchTeamsData()
	}, [])

	return (
		<Container maxWidth='lg'>
			<Grid container spacing={4} mx='auto'>
				{!teamsData.length ? (
					<Box mx='auto'>
						<CircularProgress />
					</Box>
				) : (
					teamsData.map(team => (
						<Grid item xs={6} sm={2} key={team.teamID}>
							<Link to={`/team/${team.teamAbv}`}>
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
										src={team.mlbLogo1}
										alt={`${team.teamCity} ${team.teamName}`}
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
