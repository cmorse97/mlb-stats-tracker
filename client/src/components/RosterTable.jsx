import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { fetchRosterByTeamAbv } from '../services/api'
import { quickSortRoster } from '../utils/sortRosterTable'
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

const labels = [
	{ key: 'position', label: 'Position' },
	{ key: 'name', label: 'Name' },
	{ key: 'jersey_number', label: 'Number' }
]

const RosterTable = ({ setPlayerData, handlePlayerModalOpen }) => {
	const [rosterData, setRosterData] = useState([])
	const [sortConfig, setSortConfig] = useState({
		key: 'name',
		descending: false
	})
	const { teamAbv } = useParams()

	useEffect(() => {
		const fetchRosterData = async teamAbv => {
			try {
				const response = await fetchRosterByTeamAbv(teamAbv)
				const sortedData = quickSortRoster([...response], 'name', false)
				setRosterData(sortedData)
			} catch (error) {
				console.error('Error fetching team roster:', error)
			}
		}

		fetchRosterData(teamAbv)
	}, [teamAbv])

	const handleSort = key => {
		const isDescending = sortConfig.key === key ? !sortConfig.descending : false
		const sortedRoster = quickSortRoster([...rosterData], key, isDescending)
		setRosterData(sortedRoster)
		setSortConfig({ key, descending: isDescending })
	}

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
								{labels.map(({ key, label }) => (
									<TableCell key={key} align='center'>
										<TableSortLabel
											active={sortConfig.key === key}
											direction={sortConfig.descending ? 'desc' : 'asc'}
											onClick={() => handleSort(key)}
										>
											{label}
										</TableSortLabel>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rosterData.map((player, index) => (
								<TableRow
									key={index}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align='center'>{player.position}</TableCell>
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
													src={player.avatar}
													alt={player.name}
													sx={{ marginRight: '4px' }}
												/>
												<Typography color='black' textAlign='left'>
													{player.name}
												</Typography>
											</Button>
										</Box>
									</TableCell>
									<TableCell align='center'>{player.jersey_number}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}

// Prop Types
RosterTable.propTypes = {
	setPlayerData: PropTypes.func,
	handlePlayerModalOpen: PropTypes.func
}

export default RosterTable
