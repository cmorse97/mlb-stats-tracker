import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const TopPerformers = () => {
	const [topPerformersData, setTopPerformersData] = useState({})
	const { teamAbv } = useParams()

	useEffect(() => {
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
	}, [])

	return (
		<div className='container mx-auto my-8'>
			{!Object.keys(topPerformersData).length ? (
				<p>Season has not started yet, coming soon...</p>
			) : (
				JSON.stringify(topPerformersData)
			)}
		</div>
	)
}

export default TopPerformers
