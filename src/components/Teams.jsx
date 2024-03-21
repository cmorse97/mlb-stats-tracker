import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress, Container, Box, Typography } from '@mui/material'
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
			<Box
				display='flex'
				flexWrap='wrap'
				alignItems='center'
				justifyContent='space-evenly'
				gap={10}
			>
				{!teamsData.length ? (
					<CircularProgress />
				) : (
					teamsData.map(team => (
						<Link to={`/team/${team.teamAbv}`} key={team.teamID}>
							<Box
								display='flex'
								flexDirection='column'
								alignItems='center'
								justifyContent='center'
								gap={2}
							>
								<img
									src={team.mlbLogo1}
									alt={`${team.teamCity} ${team.teamName}`}
									className='w-8 h-8 md:h-12 md:w-12'
								/>
								<Typography>{team.teamName}</Typography>
							</Box>
						</Link>
					))
				)}
			</Box>
		</Container>
	)
}

export default Teams
