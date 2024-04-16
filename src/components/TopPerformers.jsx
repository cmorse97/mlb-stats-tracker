import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
	Box,
	Grid,
	Avatar,
	Divider,
	Typography,
	Card,
	CardContent,
	CircularProgress
} from '@mui/material'

const playerAttribute = {
	mlbHeadshot: 'mlbHeadshot',
	longName: 'longName'
}

const TopPerformers = () => {
	const [topPerformersData, setTopPerformersData] = useState({})
	const [rosterData, setRosterData] = useState({})
	const { teamAbv } = useParams()

	useEffect(() => {
		const fetchRosterData = async () => {
			const options = {
				params: {
					teamAbv: teamAbv,
					getStats: 'true'
				},
				headers: {
					'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
					'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
				}
			}

			const apiUrl = import.meta.env.VITE_API_URL_TEAM_ROSTER

			axios
				.get(apiUrl, options)
				.then(response => {
					const roster = response.data.body.roster
					if (roster) {
						const playerMap = {}
						for (let player of roster) {
							playerMap[player.playerID] = player
						}
						setRosterData(playerMap)
					}
				})
				.catch(err => console.log(err))
		}

		fetchRosterData()
	}, [])

	useEffect(() => {
		if (Object.keys(rosterData).length) {
			;(async () => {
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
						setTopPerformersData(team.topPerformers)
					})
					.catch(err => console.log(err))
			})() // Invoking function immediately after creation, no need for const variable storage
		}
	}, [rosterData])

	const getPlayerAttribute = (playerID, playerAttribute) => {
		if (playerID in rosterData) {
			return rosterData[playerID][playerAttribute]
		}
	}

	return (
		<Box mx='auto' marginY={8}>
			{!Object.keys(topPerformersData).length ? (
				<Box display='flex' justifyContent='center' alignItems='center'>
					<CircularProgress />
				</Box>
			) : (
				<Grid container spacing={8}>
					<Grid item xs={12} md={6}>
						<Typography variant='h6' textAlign='center' marginBottom={2}>
							Top Pitching Performers
						</Typography>
						<Divider />
						<Grid container spacing={2} marginTop={2}>
							<Grid item xs={4}>
								<Card raised sx={{ borderRadius: '5%' }}>
									<CardContent>
										<Typography textAlign='center'>Stikeouts</Typography>
										<Avatar
											src={getPlayerAttribute(
												topPerformersData.Pitching.SO.playerID[0],
												playerAttribute.mlbHeadshot
											)}
											alt={getPlayerAttribute(
												topPerformersData.Pitching.SO.playerID[0],
												playerAttribute.longName
											)}
											sx={{
												width: '56px',
												height: '56px',
												mx: 'auto',
												my: '8px'
											}}
										/>
										<Typography textAlign='center'>
											{getPlayerAttribute(
												topPerformersData.Pitching.SO.playerID[0],
												playerAttribute.longName
											)}
										</Typography>
										<Typography textAlign='center' fontWeight='bold'>
											{topPerformersData.Pitching.SO.total}
										</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={4}>
								<Card raised sx={{ borderRadius: '5%' }}>
									<CardContent>
										<Typography textAlign='center'>Wins</Typography>
										<Avatar
											src={getPlayerAttribute(
												topPerformersData.Pitching.Win.playerID[0],
												playerAttribute.mlbHeadshot
											)}
											alt={getPlayerAttribute(
												topPerformersData.Pitching.Win.playerID[0],
												playerAttribute.longName
											)}
											sx={{
												width: '56px',
												height: '56px',
												mx: 'auto',
												my: '8px'
											}}
										/>
										<Typography textAlign='center'>
											{getPlayerAttribute(
												topPerformersData.Pitching.Win.playerID[0],
												playerAttribute.longName
											)}
										</Typography>
										<Typography textAlign='center' fontWeight='bold'>
											{topPerformersData.Pitching.Win.total}
										</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={4}>
								<Card raised sx={{ borderRadius: '5%' }}>
									<CardContent>
										<Typography textAlign='center'>Saves</Typography>
										<Avatar
											src={getPlayerAttribute(
												topPerformersData.Pitching.Save.playerID[0],
												playerAttribute.mlbHeadshot
											)}
											alt={getPlayerAttribute(
												topPerformersData.Pitching.Save.playerID[0],
												playerAttribute.longName
											)}
											sx={{
												width: '56px',
												height: '56px',
												mx: 'auto',
												my: '8px'
											}}
										/>
										<Typography textAlign='center'>
											{getPlayerAttribute(
												topPerformersData.Pitching.Save.playerID[0],
												playerAttribute.longName
											)}
										</Typography>
										<Typography textAlign='center' fontWeight='bold'>
											{topPerformersData.Pitching.Save.total}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography variant='h6' textAlign='center' marginBottom={2}>
							Top Hitting Performers
						</Typography>
						<Divider />
						<Grid container spacing={2} marginTop={2}>
							<Grid item xs={4}>
								<Card raised sx={{ borderRadius: '5%' }}>
									<CardContent>
										<Typography textAlign='center'>Batting Average</Typography>
										<Avatar
											src={getPlayerAttribute(
												topPerformersData.Hitting.avg.playerID[0],
												playerAttribute.mlbHeadshot
											)}
											alt={getPlayerAttribute(
												topPerformersData.Hitting.avg.playerID[0],
												playerAttribute.longName
											)}
											sx={{
												width: '56px',
												height: '56px',
												mx: 'auto',
												my: '8px'
											}}
										/>
										<Typography textAlign='center'>
											{getPlayerAttribute(
												topPerformersData.Hitting.avg.playerID[0],
												playerAttribute.longName
											)}
										</Typography>
										<Typography textAlign='center' fontWeight='bold'>
											{topPerformersData.Hitting.avg.total}
										</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={4}>
								<Card raised sx={{ borderRadius: '5%' }}>
									<CardContent>
										<Typography textAlign='center'>Homeruns</Typography>
										<Avatar
											src={getPlayerAttribute(
												topPerformersData.Hitting.HR.playerID[0],
												playerAttribute.mlbHeadshot
											)}
											alt={getPlayerAttribute(
												topPerformersData.Hitting.HR.playerID[0],
												playerAttribute.longName
											)}
											sx={{
												width: '56px',
												height: '56px',
												mx: 'auto',
												my: '8px'
											}}
										/>
										<Typography textAlign='center'>
											{getPlayerAttribute(
												topPerformersData.Hitting.HR.playerID[0],
												playerAttribute.longName
											)}
										</Typography>
										<Typography textAlign='center' fontWeight='bold'>
											{topPerformersData.Hitting.HR.total}
										</Typography>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={4}>
								<Card raised sx={{ borderRadius: '5%' }}>
									<CardContent>
										<Typography textAlign='center'>Hits</Typography>
										<Avatar
											src={getPlayerAttribute(
												topPerformersData.Hitting.H.playerID[0],
												playerAttribute.mlbHeadshot
											)}
											alt={getPlayerAttribute(
												topPerformersData.Hitting.H.playerID[0],
												playerAttribute.longName
											)}
											sx={{
												width: '56px',
												height: '56px',
												mx: 'auto',
												my: '8px'
											}}
										/>
										<Typography textAlign='center'>
											{getPlayerAttribute(
												topPerformersData.Hitting.H.playerID[0],
												playerAttribute.longName
											)}
										</Typography>
										<Typography textAlign='center' fontWeight='bold'>
											{topPerformersData.Hitting.H.total}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Box>
	)
}

export default TopPerformers
