import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

const TeamStats = () => {
	const [teamData, setTeamData] = useState({})
	const { teamAbv } = useParams()

	useEffect(() => {
		const fetchData = async () => {
			axios
				.get(apiUrl, options)
				.then(response => {
					const teams = response.data.body
					const team = teams.find(team => team.teamAbv === teamAbv)
					setTeamData(team)
				})
				.catch(err => console.log(err))
		}

		fetchData()
	}, [])

	const options = {
		params: {
			teamStats: 'true',
			topPerformers: 'true'
		},
		headers: {
			'X-RapidAPI-Key': 'e700ebd9b9msh3c341d7598dfff4p170c1bjsnce6a07dfd2eb',
			'X-RapidAPI-Host':
				'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
		}
	}

	const apiUrl =
		'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeams'

	return (
		<div className='container mx-auto my-8'>
			<div className='flex gap-4 p-2 border border-black'>
				<img
					src={teamData.espnLogo1}
					alt={teamData.teamAbv}
					width={108}
					height={108}
				/>

				<div className='flex flex-col justify-center gap-2'>
					<h3>
						{teamData.teamCity} {teamData.teamName}
					</h3>
					<p>
						{teamData.conferenceAbv} {teamData.division}
					</p>
					<p>
						({teamData.wins} - {teamData.loss})
					</p>
				</div>
			</div>
		</div>
	)
}

export default TeamStats