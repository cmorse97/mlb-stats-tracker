import { useState } from 'react'
import { Button, Modal, Box, Typography, Avatar } from '@mui/material'
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
							<Typography id='modal-modal-description' sx={{ mt: 2 }}>
								{JSON.stringify(playerData, null, 2)}
							</Typography>
						</Box>
					</Box>
				</Modal>
			</div>
		</>
	)
}

export default RosterPage
