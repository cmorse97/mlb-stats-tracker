import { getStatValue } from './getStatValue'
import { calculateEarnedRunAverage } from './pitchingStatsCaclulations'

const pitchingStatsConfig = [
	{ key: 'GP', callBack: getStatValue },
	{ key: 'GS', callBack: getStatValue },
	{ key: 'W', callBack: getStatValue },
	{ key: 'L', callBack: getStatValue },
	{ key: 'ERA', callBack: calculateEarnedRunAverage },
	{ key: 'WHIP', callBack: getStatValue },
	{ key: 'IP', callBack: getStatValue },
	{ key: 'H', callBack: getStatValue },
	{ key: 'HR', callBack: getStatValue },
	{ key: 'BB', callBack: getStatValue },
	{ key: 'SO', callBack: getStatValue },
	{ key: 'R', callBack: getStatValue },
	{ key: 'ER', callBack: getStatValue },
	{ key: 'SV', callBack: getStatValue },
	{ key: 'BS', callBack: getStatValue },
	{ key: 'HOLD', callBack: getStatValue },
	{ key: 'WP', callBack: getStatValue }
]

export default pitchingStatsConfig
