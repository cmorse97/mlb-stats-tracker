import { Box, Avatar, Typography, Button } from '@mui/material'

const PlayerInfo = ({ playerData, handlePlayerModalClose }) => {
	return (
		<Box display='flex' sx={{ gap: '4em', padding: '2em' }}>
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
				<Typography>
					<span className='font-semibold'>Position:</span> {playerData?.pos}{' '}
					<span className='font-semibold'>Number:</span> {playerData?.jerseyNum}{' '}
				</Typography>
				<Typography>
					<span className='font-semibold'>Team:</span> {playerData?.team}{' '}
				</Typography>
				<Typography>
					<span className='font-semibold'>Bats:</span> {playerData?.bat}{' '}
					<span className='font-semibold'>Throws:</span> {playerData?.throw}
				</Typography>
				<Typography>
					{playerData?.height}, {playerData?.weight} lbs.
				</Typography>
				<Typography>{playerData?.highSchool}</Typography>
				<Typography>
					<span className='font-semibold'>Born:</span> {playerData?.bDay}
				</Typography>
			</Box>
			<Box position='absolute' top='20px' right='20px'>
				<Button
					onClick={handlePlayerModalClose}
					sx={{
						fontSize: '24px',
						fontWeight: 'bold',
						color: 'black'
					}}
				>
					X
				</Button>
			</Box>
		</Box>
	)
}

export default PlayerInfo
