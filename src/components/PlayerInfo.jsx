import { Box, Avatar, Typography, Button } from '@mui/material'

const PlayerInfo = ({ playerData, handlePlayerModalClose }) => {
	if (!playerData) {
		return null
	}

	const {
		longName,
		mlbHeadshot,
		pos,
		jerseyNum,
		team,
		bat,
		height,
		weight,
		highSchool,
		bDay
	} = playerData

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
					alt={longName}
					src={mlbHeadshot}
					sx={{ width: 128, height: 128 }}
				/>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					{longName}
				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='center'
				sx={{ flexDirection: 'column' }}
			>
				{/* Player information, ex: DOB, height, weight */}
				<Typography>
					<span className='font-semibold'>Position:</span> {pos}{' '}
					<span className='font-semibold'>Number:</span> {jerseyNum}{' '}
				</Typography>
				<Typography>
					<span className='font-semibold'>Team:</span> {team}{' '}
				</Typography>
				<Typography>
					<span className='font-semibold'>Bats:</span> {bat}{' '}
					{/* getting an unexpected token error due to throw being a reserved keyword */}
					<span className='font-semibold'>Throws:</span> {playerData.throw}
				</Typography>
				<Typography>
					{height}, {weight} lbs.
				</Typography>
				<Typography>{highSchool}</Typography>
				<Typography>
					<span className='font-semibold'>Born:</span> {bDay}
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
