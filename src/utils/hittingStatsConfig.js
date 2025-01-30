import {
	processStatValue,
	processGPValue,
	calculatePlateAppearances,
	calculateOBP,
	calculateSlugging,
	calculateOPS
} from './statCalculations'

const hittingStatsConfig = [
	{ key: 'GP', callBack: processGPValue },
	{ key: 'PA', callBack: calculatePlateAppearances },
	{ key: 'AB', callBack: processStatValue },
	{ key: 'R', callBack: processStatValue },
	{ key: 'H', callBack: processStatValue },
	{ key: '2B', callBack: processStatValue },
	{ key: '3B', callBack: processStatValue },
	{ key: 'HR', callBack: processStatValue },
	{ key: 'RBI', callBack: processStatValue },
	{ key: 'BB', callBack: processStatValue },
	{ key: 'SO', callBack: processStatValue },
	{ key: 'AVG', callBack: processStatValue },
	{ key: 'OBP', callBack: calculateOBP },
	{ key: 'SLG', callBack: calculateSlugging },
	{ key: 'OPS', callBack: calculateOPS },
	{ key: 'HBP', callBack: processStatValue },
	{ key: 'SF', callBack: processStatValue },
	{ key: 'TB', callBack: processStatValue }
]

export default hittingStatsConfig
