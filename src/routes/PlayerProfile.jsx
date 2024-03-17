import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PlayerProfile = () => {
	const [playerData, setPlayerData] = useState([])
	const { teamAbv, playerId } = useParams()

	useEffect(() => {
		const fetchData = async () => {
			const options = {
				params: {
					teamAbv: teamAbv,
					playerId: playerId,
					getStats: 'true'
				},
				headers: {
					'X-RapidAPI-Key':
						'e700ebd9b9msh3c341d7598dfff4p170c1bjsnce6a07dfd2eb',
					'X-RapidAPI-Host':
						'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
				}
			}

			const apiUrl =
				'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamRoster'
			axios
				.get(apiUrl, options)
				.then(response => {
					const player = response.data.body.roster.playerID
					if (player) {
						setPlayerData(player)
					}
				})
				.catch(err => console.log(err))
		}

		fetchData()
	}, [])
	return <div>{player}</div>
}

export default PlayerProfile
