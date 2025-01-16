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

import PlayerInfo from './PlayerInfo'

import pitchingStatsConfig from '../utils/pitchingStatsConfig'
import hittingStatsConfig from '../utils/hittingStatsConfig'

const PlayerModal = ({ setPlayerData, handlePlayerModalClose }) => {
	const playerData = setPlayerData

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

	return playerData.pos === 'P' ? (
		<Box sx={style}>
			<PlayerInfo
				playerData={playerData}
				handlePlayerModalClose={handlePlayerModalClose}
			/>
			<Box p={4} sx={{ border: '1px solid grey', borderRadius: '12px' }}>
				{!Object.keys(playerData.stats).length ? (
					<Typography>No stats available</Typography>
				) : (
					<TableContainer>
						<Table>
							<TableHead>
								<Typography sx={{ fontWeight: 'bold' }}>
									Pitching Stats
								</Typography>
								<TableRow>
									{pitchingStatsConfig.map((stat, index) => (
										<TableCell key={index} sx={{ fontWeight: 'bold' }}>
											{stat.key}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									{pitchingStatsConfig.map((stat, index) => (
										<TableCell key={index}>
											{stat.callBack(playerData, stat.key)}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</Box>
	) : (
		<Box sx={style}>
			<PlayerInfo
				playerData={playerData}
				handlePlayerModalClose={handlePlayerModalClose}
			/>

			<Box p={4} sx={{ border: '1px solid grey', borderRadius: '12px' }}>
				<TableContainer>
					<Table>
						<TableHead>
							<Typography sx={{ fontWeight: 'bold' }}>Hitting Stats</Typography>
							<TableRow>
								{hittingStatsConfig.map((stat, index) => (
									<TableCell
										key={index}
										sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
									>
										{stat.key}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								{hittingStatsConfig.map((stat, index) => (
									<TableCell key={index}>
										{stat.callBack(playerData, stat.key)}
									</TableCell>
								))}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}

export default PlayerModal
