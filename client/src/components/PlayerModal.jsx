import {
	Box,
	Typography,
	TableContainer,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell
} from '@mui/material'
import PropTypes from 'prop-types'

import PlayerInfo from './PlayerInfo'

const PlayerModal = ({ setPlayerData, handlePlayerModalClose }) => {
	const playerData = setPlayerData
	const isPlayerPitcher = playerData.position === 'P'
	const heading = isPlayerPitcher ? 'Pitching Stats' : 'Hitting Stats'

	const statKeyMap = {
		InningsPitched: 'IP',
		'Wild Pitch': 'WP',
		Win: 'W',
		Loss: 'L',
		Save: 'SV',
		BlownSave: 'BS',
		CompleteGame: 'CG',
		ShutOut: 'SHO'
	}

	const hiddenKeys = [
		'PerfectGame',
		'Flyouts',
		'Pitches',
		'NoHitter',
		'Strikes',
		'Groundouts',
		'Batters Faced'
	]

	const statData = isPlayerPitcher
		? playerData.stats?.Pitching || {}
		: playerData.stats?.Hitting || {}

	const statEntries = Object.entries(statData).filter(
		([key]) => !hiddenKeys.includes(key)
	)

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

	return (
		<Box sx={style}>
			<PlayerInfo
				playerData={playerData}
				handlePlayerModalClose={handlePlayerModalClose}
			/>
			<Box p={4} sx={{ border: '1px solid grey', borderRadius: '12px' }}>
				{!statEntries.length ? (
					<Typography>No stats available</Typography>
				) : (
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell colSpan={statEntries.length}>
										<Typography sx={{ fontWeight: 'bold' }}>
											{heading}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									{statEntries.map(([key]) => (
										<TableCell
											key={key}
											sx={{
												fontWeight: 'bold',
												textAlign: 'center',
												textTransform: 'uppercase'
											}}
										>
											{statKeyMap[key] || key}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									{statEntries.map(([_, value], index) => (
										<TableCell key={index}>{value}</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</Box>
	)
}

PlayerModal.propTypes = {
	setPlayerData: PropTypes.object.isRequired,
	handlePlayerModalClose: PropTypes.func.isRequired
}

export default PlayerModal
