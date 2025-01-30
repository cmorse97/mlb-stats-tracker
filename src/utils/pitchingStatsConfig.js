import {
	processStatValue,
	processGPValue,
	processGSValue,
	calculateEarnedRunAverage
} from './statCalculations'

const pitchingStatsConfig = [
	{ key: 'GP', callBack: processGPValue },
	{ key: 'GS', callBack: processGSValue },
	{ key: 'W', callBack: processStatValue },
	{ key: 'L', callBack: processStatValue },
	{ key: 'ERA', callBack: calculateEarnedRunAverage },
	{ key: 'WHIP', callBack: processStatValue },
	{ key: 'IP', callBack: processStatValue },
	{ key: 'H', callBack: processStatValue },
	{ key: 'HR', callBack: processStatValue },
	{ key: 'BB', callBack: processStatValue },
	{ key: 'SO', callBack: processStatValue },
	{ key: 'R', callBack: processStatValue },
	{ key: 'ER', callBack: processStatValue },
	{ key: 'SV', callBack: processStatValue },
	{ key: 'BS', callBack: processStatValue },
	{ key: 'HOLD', callBack: processStatValue },
	{ key: 'WP', callBack: processStatValue }
]

export default pitchingStatsConfig
