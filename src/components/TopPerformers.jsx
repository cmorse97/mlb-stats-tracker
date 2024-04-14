import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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
		<div className='container mx-auto my-8'>
			{!Object.keys(topPerformersData).length ? (
				<p>Season has not started yet, coming soon...</p>
			) : (
				<>
					<div>
						<h4>Top Pitching Performers</h4>
						<div>
							<h5>Strikeouts</h5>
							<div>
								<img
									src={getPlayerAttribute(
										topPerformersData.Pitching.SO.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Pitching.SO.playerID[0],
										playerAttribute.longName
									)}
									width={108}
									height={108}
								/>
								<p>
									{getPlayerAttribute(
										topPerformersData.Pitching.SO.playerID[0],
										playerAttribute.longName
									)}
								</p>
								<p>{topPerformersData.Pitching.SO.total}</p>
							</div>
							<h5>Earned Runs</h5>
							<div>
								<img
									src={getPlayerAttribute(
										topPerformersData.Pitching.ER.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Pitching.ER.playerID[0],
										playerAttribute.longName
									)}
									width={108}
									height={108}
								/>
								<p>
									{getPlayerAttribute(
										topPerformersData.Pitching.ER.playerID[0],
										playerAttribute.longName
									)}
								</p>
								<p>{topPerformersData.Pitching.ER.total}</p>
							</div>
							<h5>Saves</h5>
							<div>
								<img
									src={getPlayerAttribute(
										topPerformersData.Pitching.Save.playerID[0],
										playerAttribute.mlbHeadshot
									)}
									alt={getPlayerAttribute(
										topPerformersData.Pitching.Save.playerID[0],
										playerAttribute.longName
									)}
									width={108}
									height={108}
								/>
								<p>
									{getPlayerAttribute(
										topPerformersData.Pitching.Save.playerID[0],
										playerAttribute.longName
									)}
								</p>
								<p>{topPerformersData.Pitching.Save.total}</p>
							</div>
						</div>

						<div>
							<h4>Top Hitting Performers</h4>
							<div>
								<h5>Batting Average</h5>
								<div>
									<img
										src={getPlayerAttribute(
											topPerformersData.Hitting.avg.playerID[0],
											playerAttribute.mlbHeadshot
										)}
										alt={getPlayerAttribute(
											topPerformersData.Hitting.avg.playerID[0],
											playerAttribute.longName
										)}
										width={108}
										height={108}
									/>
									<p>
										{getPlayerAttribute(
											topPerformersData.Hitting.avg.playerID[0],
											playerAttribute.longName
										)}
									</p>
									<p>{topPerformersData.Hitting.avg.total}</p>
								</div>
								<h5>Homeruns</h5>
								<div>
									<img
										src={getPlayerAttribute(
											topPerformersData.Hitting.HR.playerID[0],
											playerAttribute.mlbHeadshot
										)}
										alt={getPlayerAttribute(
											topPerformersData.Hitting.HR.playerID[0],
											playerAttribute.longName
										)}
										width={108}
										height={108}
									/>
									<p>
										{getPlayerAttribute(
											topPerformersData.Hitting.HR.playerID[0],
											playerAttribute.longName
										)}
									</p>
									<p>{topPerformersData.Hitting.HR.total}</p>
								</div>
								<h5>Hits</h5>
								<div>
									<img
										src={getPlayerAttribute(
											topPerformersData.Hitting.H.playerID[0],
											playerAttribute.mlbHeadshot
										)}
										alt={getPlayerAttribute(
											topPerformersData.Hitting.H.playerID[0],
											playerAttribute.longName
										)}
										width={108}
										height={108}
									/>
									<p>
										{getPlayerAttribute(
											topPerformersData.Hitting.H.playerID[0],
											playerAttribute.longName
										)}
									</p>
									<p>{topPerformersData.Hitting.H.total}</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default TopPerformers
