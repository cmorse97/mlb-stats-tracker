import { useState } from 'react'
import {
	Button,
	Modal,
	Box,
	Typography,
	Avatar,
	TableContainer,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell
} from '@mui/material'
import Navbar from '../components/Navbar'
import TeamStats from '../components/TeamStats'
import RosterTable from '../components/RosterTable'
import TopPerformers from '../components/TopPerformers'
import {
	calculateSlugging,
	calculatePlateAppearances,
	calculateOBP,
	calculateOPS
} from '../utils/hittingStatsCalculations'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	borderRadius: '24px',
	boxShadow: 24,
	p: 4
}

const RosterPage = () => {
	const [playerData, setPlayerData] = useState()
	const [playerModalOpen, setPlayerModalOpen] = useState(false)
	const handlePlayerModalOpen = () => setPlayerModalOpen(true)
	const handlePlayerModalClose = () => setPlayerModalOpen(false)

	return (
		<>
			<Navbar />
			<TeamStats />
			<TopPerformers />
			<RosterTable
				setPlayerData={setPlayerData}
				handlePlayerModalOpen={handlePlayerModalOpen}
			/>
			<div className='container mx-auto my-8'>
				<Modal
					open={playerModalOpen}
					onClose={handlePlayerModalClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<Box display='flex' gap={4} p={2}>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='center'
								gap={2}
								p={2}
								sx={{ flexDirection: 'column' }}
							>
								<Avatar
									alt={playerData?.longName}
									src={playerData?.mlbHeadshot}
									sx={{ width: 128, height: 128 }}
								/>
								<Typography id='modal-modal-title' variant='h6' component='h2'>
									{playerData?.longName}
								</Typography>
							</Box>
							<Box
								display='flex'
								justifyContent='center'
								sx={{ flexDirection: 'column' }}
							>
								{/* Player information, ex: DOB, height, weight */}
								<p>
									<span className='font-semibold'>Position:</span>{' '}
									{playerData?.pos}{' '}
									<span className='font-semibold'>Number:</span>{' '}
									{playerData?.jerseyNum}{' '}
								</p>
								<p>
									<span className='font-semibold'>Team:</span>{' '}
									{playerData?.team}{' '}
								</p>
								<p>
									<span className='font-semibold'>Bats:</span> {playerData?.bat}{' '}
									<span className='font-semibold'>Throws:</span>{' '}
									{playerData?.throw}
								</p>
								<p>
									{playerData?.height}, {playerData?.weight} lbs.
								</p>
								<p>{playerData?.highSchool}</p>
								<p>
									<span className='font-semibold'>Born:</span>{' '}
									{playerData?.bDay}
								</p>
							</Box>
							<Box position='absolute' top='20px' right='20px'>
								<Button
									onClick={handlePlayerModalClose}
									sx={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}
								>
									X
								</Button>
							</Box>
						</Box>
						<Box p={4} sx={{ border: '1px solid grey', borderRadius: '12px' }}>
							<TableContainer>
								<Table>
									<TableHead>
										<Typography variant='h6' sx={{ textWrap: 'nowrap' }}>
											2024 Stats
										</Typography>
										<Typography sx={{ fontWeight: 'bold' }}>Hitting</Typography>
										<TableRow>
											<TableCell sx={{ fontWeight: 'bold' }}>GP</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>PA</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>AB</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>R</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>H</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>2B</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>3B</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>HR</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>RBI</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>BB</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>SO</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>AVG</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>OBP</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>SLG</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>OPS</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>HBP</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>SF</TableCell>
											<TableCell sx={{ fontWeight: 'bold' }}>TB</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell>{playerData?.stats.gamesPlayed}</TableCell>
											<TableCell>
												{calculatePlateAppearances(playerData)}
											</TableCell>
											<TableCell>{playerData?.stats.Hitting.AB}</TableCell>
											<TableCell>{playerData?.stats.Hitting.R}</TableCell>
											<TableCell>{playerData?.stats.Hitting.H}</TableCell>
											<TableCell>{playerData?.stats.Hitting['2B']}</TableCell>
											<TableCell>{playerData?.stats.Hitting['3B']}</TableCell>
											<TableCell>{playerData?.stats.Hitting.HR}</TableCell>
											<TableCell>{playerData?.stats.Hitting.RBI}</TableCell>
											<TableCell>{playerData?.stats.Hitting.BB}</TableCell>
											<TableCell>{playerData?.stats.Hitting.SO}</TableCell>
											<TableCell>{playerData?.stats.Hitting.avg}</TableCell>
											<TableCell>{calculateOBP(playerData)}</TableCell>
											<TableCell>{calculateSlugging(playerData)}</TableCell>
											<TableCell>{calculateOPS(playerData)}</TableCell>
											<TableCell>{playerData?.stats.Hitting.HBP}</TableCell>
											<TableCell>{playerData?.stats.Hitting.SF}</TableCell>
											<TableCell>{playerData?.stats.Hitting.TB}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Box>
				</Modal>
			</div>
		</>
	)
}

export default RosterPage
