import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	Avatar,
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
	TableSortLabel,
	Paper
} from '@mui/material'
import axios from 'axios'
import { sortRosterTable } from '../utils/sortRosterTable'

const RosterTable = ({ setPlayerData, handlePlayerModalOpen }) => {
	const [rosterData, setRosterData] = useState([])
	const [sortBy, setSortBy] = useState('pos')
	const [sortDirection, setSortDirection] = useState('asc')
	const { teamAbv } = useParams()

	const handleSort = column => {
		if (sortBy === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(column)
			setSortDirection('asc')
		}
	}

	const sortedData = sortRosterTable(rosterData, sortBy, sortDirection) // Use sortData function

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
				<TableContainer component={Paper} elevation={24}>
					<Table sx={{ minWidth: 'sm' }}>
						<TableHead>
							<TableRow>
								<TableCell align='center'>
									<TableSortLabel
										active={sortBy === 'pos'}
										direction={sortDirection}
										onClick={() => handleSort('pos')}
									>
										Position
									</TableSortLabel>
								</TableCell>
								<TableCell align='center'>
									<TableSortLabel
										active={sortBy === 'longName'}
										direction={sortDirection}
										onClick={() => handleSort('longName')}
									>
										Name
									</TableSortLabel>
								</TableCell>
								<TableCell align='center'>
									<TableSortLabel
										active={sortBy === 'jerseyNum'}
										direction={sortDirection}
										onClick={() => handleSort('jerseyNum')}
									>
										Number
									</TableSortLabel>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedData.map(player => (
								<TableRow
									key={player.playerID}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align='center'>{player.pos}</TableCell>
									<TableCell align='left'>
										<Box
											sx={{
												width: '60%',
												marginX: 'auto'
											}}
										>
											<Button
												onClick={() => {
													setPlayerData(player)
													handlePlayerModalOpen()
												}}
												disabled={Object.keys(player).length === 0}
												sx={{
													width: '60%',
													display: 'flex',
													justifyContent: 'start',
													marginX: 'auto'
												}}
											>
												<Avatar
													src={player.mlbHeadshot}
													alt={player.longName}
													sx={{ marginRight: '4px' }}
												/>
												<Typography color='black' textAlign='left'>
													{player.longName}
												</Typography>
											</Button>
										</Box>
									</TableCell>
									<TableCell align='center'>{player.jerseyNum}</TableCell>
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
