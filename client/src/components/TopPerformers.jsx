import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRosterByTeamAbv } from '../services/api'
import {
	Box,
	// Grid,
	// Avatar,
	// Divider,
	Typography,
	// Card,
	// CardContent,
	CircularProgress
} from '@mui/material'

const TopPerformers = () => {
	const [rosterData, setRosterData] = useState([])
	const { teamAbv } = useParams()

	useEffect(() => {
		const fetchRosterData = async teamAbv => {
			try {
				const response = await fetchRosterByTeamAbv(teamAbv)
				setRosterData(response)
			} catch (error) {
				console.error('Error fetching team roster:', error)
			}
		}

		fetchRosterData(teamAbv)
	}, [teamAbv])

	return (
		<Box mx='auto' marginY={8}>
			{!rosterData ? (
				<Box display='flex' justifyContent='center' alignItems='center'>
					<CircularProgress />
				</Box>
			) : (
				<Box>
					<Typography variant='h4'>Top Performers</Typography>
				</Box>
			)}
		</Box>
	)
}

export default TopPerformers
