import { getStatValue } from './getStatValue'
import {
	calculateSlugging,
	calculatePlateAppearances,
	calculateOBP,
	calculateOPS
} from './hittingStatsCalculations'

const hittingStatsConfig = [
	{ key: 'GP', callBack: getStatValue },
	{ key: 'PA', callBack: calculatePlateAppearances },
	{ key: 'AB', callBack: getStatValue },
	{ key: 'R', callBack: getStatValue },
	{ key: 'H', callBack: getStatValue },
	{ key: '2B', callBack: getStatValue },
	{ key: '3B', callBack: getStatValue },
	{ key: 'HR', callBack: getStatValue },
	{ key: 'RBI', callBack: getStatValue },
	{ key: 'BB', callBack: getStatValue },
	{ key: 'SO', callBack: getStatValue },
	{ key: 'AVG', callBack: getStatValue },
	{ key: 'OBP', callBack: calculateOBP },
	{ key: 'SLG', callBack: calculateSlugging },
	{ key: 'OPS', callBack: calculateOPS },
	{ key: 'HBP', callBack: getStatValue },
	{ key: 'SF', callBack: getStatValue },
	{ key: 'TB', callBack: getStatValue }
]

export default hittingStatsConfig
