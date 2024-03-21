import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	Button,
	CircularProgress,
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material'
import axios from 'axios'

const RosterTable = ({ setPlayerData, handlePlayerModalOpen }) => {
	const [rosterData, setRosterData] = useState([])
	const { teamAbv } = useParams()

	// Add sorting functionality to roster table

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
						setRosterData(roster)
					}
				})
				.catch(err => console.log(err))
		}

		fetchRosterData()
	}, [])

	return (
		<>
			{!rosterData.length ? (
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					marginY={8}
				>
					<CircularProgress />
				</Box>
			) : (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Position</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Number</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rosterData.map(player => (
								<TableRow
									key={player.playerID}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell>{player.pos}</TableCell>
									<TableCell align='left'>
										<Button
											onClick={() => {
												setPlayerData(player)
												handlePlayerModalOpen()
											}}
											disabled={Object.keys(player).length === 0}
										>
											<img
												src={player.mlbHeadshot}
												alt={player.longName}
												width={36}
												height={36}
												className='mr-2'
											/>
											<Typography color='black'>{player.longName}</Typography>
										</Button>
									</TableCell>
									<TableCell>{player.jerseyNum}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}

export default RosterTable
