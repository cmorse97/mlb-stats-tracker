import {
	Button,
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

import {
	calculateSlugging,
	calculatePlateAppearances,
	calculateOBP,
	calculateOPS
} from '../utils/hittingStatsCalculations'
import { calculateEarnedRunAverage } from '../utils/pitchingStatsCaclulations'
import pitchingStatsConfig from '../utils/pitchingStatsConfig'
import hittingStatsConfig from '../utils/hittingStatsConfig'

const PlayerModal = ({ setPlayerData, handlePlayerModalClose }) => {
	const playerData = setPlayerData

	const getStatValue = (playerData, key) => {
		if (key === 'calculateEarnedRunAverage') {
			return calculateEarnedRunAverage(playerData)
		}
		if (key === 'calculatePlateAppearances') {
			return calculatePlateAppearances(playerData)
		}
		if (key === 'calculateOBP') {
			return calculateOBP(playerData)
		}
		if (key === 'calculateSlugging') {
			return calculateSlugging(playerData)
		}
		if (key === 'calculateOPS') {
			return calculateOPS(playerData)
		}
		return key
			.split('.')
			.reduce(
				(obj, k) => (obj && obj[k] !== 'undefined' ? obj[k] : null),
				playerData?.stats
			)
	}

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

	return playerData?.pos === 'P' ? (
		<Box sx={style}>
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
						<span className='font-semibold'>Number:</span>{' '}
						{playerData?.jerseyNum}{' '}
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
											{stat.heading}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									{pitchingStatsConfig.map((stat, index) => (
										<TableCell key={index}>
											{getStatValue(playerData, stat.key)}
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
					<Typography>
						<span className='font-semibold'>Position:</span> {playerData?.pos}{' '}
						<span className='font-semibold'>Number:</span>{' '}
						{playerData?.jerseyNum}{' '}
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

			<Box p={4} sx={{ border: '1px solid grey', borderRadius: '12px' }}>
				<TableContainer>
					<Table>
						<TableHead>
							<Typography sx={{ fontWeight: 'bold' }}>Hitting Stats</Typography>
							<TableRow>
								{hittingStatsConfig.map((stat, index) => (
									<TableCell key={index} sx={{ fontWeight: 'bold' }}>
										{stat.heading}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								{hittingStatsConfig.map((stat, index) => (
									<TableCell key={index}>
										{getStatValue(playerData, stat.key)}
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
