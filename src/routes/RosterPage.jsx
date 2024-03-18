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
	const calculateSlugging = () => {
		// (1Bx1 + 2Bx2 + 3Bx3 + HRx4)/AB
		const single =
			playerData?.stats.Hitting.H -
			playerData?.stats.Hitting['2B'] -
			playerData?.stats.Hitting['3B'] -
			playerData?.stats.Hitting.HR
		const double = playerData?.stats.Hitting['2B'] * 2
		const triple = playerData?.stats.Hitting['3B'] * 3
		const homerun = playerData?.stats.Hitting.HR * 4
		const ab = playerData?.stats.Hitting.AB
		const slg = (single + double + triple + homerun) / ab
		return slg.toFixed(3)
	}
	const calculatePlateAppearances = () => {
		const ab = Number(playerData?.stats.Hitting.AB)
		const bb = Number(playerData?.stats.Hitting.BB)
		const ibb = Number(playerData?.stats.Hitting.IBB)
		const sac = Number(playerData?.stats.Hitting.SAC)
		const hbp = Number(playerData?.stats.Hitting.HBP)
		const sf = Number(playerData?.stats.Hitting.SF)
		const gidp = Number(playerData?.stats.Hitting.GIDP)
		const pa = ab + bb + ibb + sac + hbp + sf + gidp
		return pa
	}
	const calculateOBP = () => {
		const hits = Number(playerData?.stats.Hitting.H)
		const walks = Number(playerData?.stats.Hitting.BB)
		const hitByPitch = Number(playerData?.stats.Hitting.HBP)
		const ab = Number(playerData?.stats.Hitting.AB)
		const sf = Number(playerData?.stats.Hitting.SF)
		const obp = (hits + walks + hitByPitch) / (ab + walks + hitByPitch + sf)
		return obp.toFixed(3)
	}
	const calculateOPS = () => {
		const obp = Number(calculateOBP())
		const slg = Number(calculateSlugging())
		return obp + slg
	}

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
						<Box
							display='flex'
							gap={4}
							p={2}
							sx={{
								border: '2px solid black'
							}}
						>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='center'
								gap={2}
								p={2}
								sx={{ flexDirection: 'column', border: '2px solid red' }}
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
								sx={{ flexDirection: 'column', border: '2px solid green' }}
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
							<Button
								onClick={handlePlayerModalClose}
								position='absolute'
								top='80px'
								right='80px'
							>
								X
							</Button>
						</Box>
						<Box p={4} sx={{ border: '2px solid blue' }}>
							<TableContainer>
								<Table>
									<TableHead>
										<Typography variant='h6'>2024 Stats</Typography>
										<Typography>Hitting</Typography>
										<TableRow>
											<TableCell>GP</TableCell>
											<TableCell>PA</TableCell>
											<TableCell>AB</TableCell>
											<TableCell>R</TableCell>
											<TableCell>H</TableCell>
											<TableCell>2B</TableCell>
											<TableCell>3B</TableCell>
											<TableCell>HR</TableCell>
											<TableCell>RBI</TableCell>
											<TableCell>BB</TableCell>
											<TableCell>SO</TableCell>
											<TableCell>AVG</TableCell>
											<TableCell>OBP</TableCell>
											<TableCell>SLG</TableCell>
											<TableCell>OPS</TableCell>
											<TableCell>HBP</TableCell>
											<TableCell>SF</TableCell>
											<TableCell>TB</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell>{playerData?.stats.gamesPlayed}</TableCell>
											<TableCell>{calculatePlateAppearances()}</TableCell>
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
											<TableCell>{calculateOBP()}</TableCell>
											<TableCell>{calculateSlugging()}</TableCell>
											<TableCell>{calculateOPS()}</TableCell>
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
