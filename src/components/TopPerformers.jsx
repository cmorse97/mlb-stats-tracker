import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
	Box,
	Grid,
	Paper,
	Avatar,
	Divider,
	Typography,
	Card,
	CardContent
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
						console.log(topPerformersData)
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
		<Box marginX='auto' marginY={8}>
			{!Object.keys(topPerformersData).length ? (
				<p>Season has not started yet, coming soon...</p>
			) : (
				<Box sx={{ border: 'black solid 2px' }}>
					<Box sx={{ border: 'red solid 2px' }} margin={2}>
						<Typography variant='h6'>Top Pitching Performers</Typography>
						<Grid container spacing={2}>
							<Card>
								<CardContent>
									<Typography variant='subtitle1'>Strikeouts</Typography>
									<Grid item xs={2}>
										<Avatar
											src={getPlayerAttribute(
												topPerformersData.Pitching.SO.playerID[0],
												playerAttribute.mlbHeadshot
											)}
											alt={getPlayerAttribute(
												topPerformersData.Pitching.SO.playerID[0],
												playerAttribute.longName
											)}
										/>
										<Typography>
											{getPlayerAttribute(
												topPerformersData.Pitching.SO.playerID[0],
												playerAttribute.longName
											)}
										</Typography>
										<Typography>
											{topPerformersData.Pitching.SO.total}
										</Typography>
									</Grid>
								</CardContent>
							</Card>
							<Typography variant='subtitle1'>Wins</Typography>
							<Grid>
								<Avatar
									src={getPlayerAttribute(
										topPerformersData.Pitching.Win.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Pitching.Win.playerID[0],
										playerAttribute.longName
									)}
								/>
								<Typography>
									{getPlayerAttribute(
										topPerformersData.Pitching.Win.playerID[0],
										playerAttribute.longName
									)}
								</Typography>
								<Typography>{topPerformersData.Pitching.Win.total}</Typography>
							</Grid>
							<Typography variant='subtitle1'>Saves</Typography>
							<Grid>
								<Avatar
									src={getPlayerAttribute(
										topPerformersData.Pitching.Save.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Pitching.Save.playerID[0],
										playerAttribute.longName
									)}
								/>
								<Typography>
									{getPlayerAttribute(
										topPerformersData.Pitching.Save.playerID[0],
										playerAttribute.longName
									)}
								</Typography>
								<Typography>{topPerformersData.Pitching.Save.total}</Typography>
							</Grid>
						</Grid>
					</Box>

					<Box sx={{ border: 'blue solid 2px' }} margin={2}>
						<Typography variant='h6'>Top Hitting Performers</Typography>
						<Grid>
							<Typography variant='subtitle1'>Batting Average</Typography>
							<Grid>
								<Avatar
									src={getPlayerAttribute(
										topPerformersData.Hitting.avg.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Hitting.avg.playerID[0],
										playerAttribute.longName
									)}
								/>
								<Typography>
									{getPlayerAttribute(
										topPerformersData.Hitting.avg.playerID[0],
										playerAttribute.longName
									)}
								</Typography>
								<Typography>{topPerformersData.Hitting.avg.total}</Typography>
							</Grid>
							<Typography variant='subtitle1'>Homeruns</Typography>
							<Grid>
								<Avatar
									src={getPlayerAttribute(
										topPerformersData.Hitting.HR.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Hitting.HR.playerID[0],
										playerAttribute.longName
									)}
								/>
								<Typography>
									{getPlayerAttribute(
										topPerformersData.Hitting.HR.playerID[0],
										playerAttribute.longName
									)}
								</Typography>
								<Typography>{topPerformersData.Hitting.HR.total}</Typography>
							</Grid>
							<Typography variant='subtitle1'>Hits</Typography>
							<Grid>
								<Avatar
									src={getPlayerAttribute(
										topPerformersData.Hitting.H.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Hitting.H.playerID[0],
										playerAttribute.longName
									)}
								/>
								<Typography>
									{getPlayerAttribute(
										topPerformersData.Hitting.H.playerID[0],
										playerAttribute.longName
									)}
								</Typography>
								<Typography>{topPerformersData.Hitting.H.total}</Typography>
							</Grid>
						</Grid>
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default TopPerformers
