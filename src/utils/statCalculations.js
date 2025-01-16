import statKeyMap from './statKeyMap'

// _key is not used in these functions, but it is passed in as an argument to the callback functions in hittingStatsConfig.js and pitchingStatsConfig.js to match the signature of the other callback functions

const calculateSlugging = (playerData, _key) => {
	const single =
		playerData?.stats.Hitting.H -
		playerData?.stats.Hitting['2B'] -
		playerData?.stats.Hitting['3B'] -
		playerData?.stats.Hitting.HR
	const double = playerData?.stats.Hitting['2B'] * 2
	const triple = playerData?.stats.Hitting['3B'] * 3
	const homerun = playerData?.stats.Hitting.HR * 4
	const ab = playerData?.stats.Hitting.AB
	const slg = (single + double + triple + homerun) / ab
	return slg.toFixed(3).replace(/^0/, '')
}

const calculatePlateAppearances = (playerData, _key) => {
	const ab = Number(playerData?.stats.Hitting.AB)
	const bb = Number(playerData?.stats.Hitting.BB)
	const ibb = Number(playerData?.stats.Hitting.IBB)
	const sac = Number(playerData?.stats.Hitting.SAC)
	const hbp = Number(playerData?.stats.Hitting.HBP)
	const sf = Number(playerData?.stats.Hitting.SF)
	const gidp = Number(playerData?.stats.Hitting.GIDP)
	const pa = ab + bb + ibb + sac + hbp + sf + gidp
	return pa
}

const calculateOBP = (playerData, _key) => {
	const hits = Number(playerData?.stats.Hitting.H)
	const walks = Number(playerData?.stats.Hitting.BB)
	const hitByPitch = Number(playerData?.stats.Hitting.HBP)
	const ab = Number(playerData?.stats.Hitting.AB)
	const sf = Number(playerData?.stats.Hitting.SF)
	const obp = (hits + walks + hitByPitch) / (ab + walks + hitByPitch + sf)
	return obp.toFixed(3).replace(/^0/, '')
}

const calculateOPS = (playerData, _key) => {
	const obp = Number(calculateOBP(playerData))
	const slg = Number(calculateSlugging(playerData))
	const ops = obp + slg
	return ops.toFixed(3).replace(/^0/, '')
}

const calculateEarnedRunAverage = (playerData, _key) => {
	// 9 X earned runs/innings pitched
	const earnedRuns = Number(playerData?.stats.Pitching.ER)
	const inningsPitched = Number(playerData?.stats.Pitching.InningsPitched)
	const era = 9 * (earnedRuns / inningsPitched)
	return era.toFixed(2)
}

const processStatValue = (playerData, key) => {
	if (!playerData) {
		return null
	} else if (playerData.pos === 'P') {
		const mappedKey = statKeyMap.Pitching[key]
		if (!mappedKey) {
			console.error(`No key found for ${key}`)
			return 'N/A'
		}
		return mappedKey.split('.').reduce((obj, i) => obj[i], playerData.stats)
	} else {
		const mappedKey = statKeyMap.Hitting[key]
		if (!mappedKey) {
			console.error(`No key found for ${key}`)
			return 'N/A'
		}
		return mappedKey.split('.').reduce((obj, i) => obj[i], playerData.stats)
	}
}

const processGPValue = (playerData, key) => {
	const mappedKey = statKeyMap[key]
	return mappedKey.split('.').reduce((obj, i) => obj[i], playerData.stats)
}

const processGSValue = (playerData, key) => {
	const mappedKey = statKeyMap[key]
	return mappedKey.split('.').reduce((obj, i) => obj[i], playerData.stats)
}

export {
	calculateSlugging,
	calculatePlateAppearances,
	calculateOBP,
	calculateOPS,
	calculateEarnedRunAverage,
	processStatValue,
	processGPValue,
	processGSValue
}
