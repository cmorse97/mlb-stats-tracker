import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Box, Typography } from '@mui/material'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function RosterTable({ setPlayerData, handlePlayerModalOpen }) {
	const [rosterData, setRosterData] = useState([])
	const { teamAbv } = useParams()

	useEffect(() => {
		const fetchRosterData = async () => {
			const options = {
				params: {
					teamAbv: teamAbv,
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
		<div className='container mx-auto my-8'>
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
		</div>
	)
}
