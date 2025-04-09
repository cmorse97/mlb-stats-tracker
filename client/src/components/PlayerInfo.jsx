import { Box, Avatar, Typography, Button } from '@mui/material'
import PropTypes from 'prop-types'

const PlayerInfo = ({ playerData, handlePlayerModalClose }) => {
	if (!playerData) {
		return null
	}

	const {
		name,
		avatar,
		position,
		jersey_number,
		team_abv,
		bats,
		height,
		weight,
		bday,
		throws
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
				<Avatar alt={name} src={avatar} sx={{ width: 128, height: 128 }} />
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					{name}
				</Typography>
			</Box>
			<Box
				display='flex'
				justifyContent='center'
				sx={{ flexDirection: 'column' }}
			>
				{/* Player information, ex: DOB, height, weight */}
				<Typography>
					<span className='font-semibold'>Position:</span> {position}{' '}
					<span className='font-semibold'>Number:</span> {jersey_number}{' '}
				</Typography>
				<Typography>
					<span className='font-semibold'>Team:</span> {team_abv}{' '}
				</Typography>
				<Typography>
					<span className='font-semibold'>Bats:</span> {bats}{' '}
					{/* getting an unexpected token error due to throw being a reserved keyword */}
					<span className='font-semibold'>Throws:</span> {throws}
				</Typography>
				<Typography>
					{height}, {weight} lbs.
				</Typography>
				<Typography>
					<span className='font-semibold'>Born:</span> {bday}
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

PlayerInfo.propTypes = {
	playerData: PropTypes.object,
	handlePlayerModalClose: PropTypes.func
}

export default PlayerInfo
