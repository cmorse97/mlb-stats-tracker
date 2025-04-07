const calculateSlugging = playerData => {
	if (!playerData.stats.Hitting) return null
	const { H, '2B': doubles, '3B': triples, HR, AB } = playerData.stats.Hitting
	const single = H - doubles - triples - HR
	const slg = (single + 2 * doubles + 3 * triples + 4 * HR) / AB
	return slg.toFixed(3).replace(/^0/, '')
}

const calculatePlateAppearances = playerData => {
	if (!playerData.stats.Hitting) return null
	const { AB, BB, IBB, SAC, HBP, SF, GIDP } = playerData.stats.Hitting
	const pa = parseInt(AB + BB + IBB + SAC + HBP + SF + GIDP)
	return pa
}

const calculateOBP = playerData => {
	if (!playerData.stats.Hitting) return null
	const { H, BB, HBP, AB, SF } = playerData.stats.Hitting
	const obp = parseInt((H + BB + HBP) / (AB + BB + HBP + SF))
	return obp.toFixed(3).replace(/^0/, '')
}

const calculateOPS = playerData => {
	const obp = parseFloat(calculateOBP(playerData)) || 0
	const slg = parseFloat(calculateSlugging(playerData)) || 0
	return (obp + slg).toFixed(3).replace(/^0/, '')
}

const calculateEarnedRunAverage = playerData => {
	if (!playerData.stats.Pitching) return null
	// 9 X earned runs/innings pitched
	const { ER, InningsPitched } = playerData.stats.Pitching
	if (!InningsPitched) return null
	const era = 9 * parseInt(ER / InningsPitched)
	return era.toFixed(2)
}

const addCalculatedStats = playerData => {
	if (playerData.position === 'P') {
		playerData.stats.Pitching.ERA = calculateEarnedRunAverage(playerData)
	} else {
		playerData.stats.Hitting.SLG = calculateSlugging(playerData)
		playerData.stats.Hitting.PA = calculatePlateAppearances(playerData)
		playerData.stats.Hitting.OBP = calculateOBP(playerData)
		playerData.stats.Hitting.OPS = calculateOPS(playerData)
	}

	return playerData
}

export default addCalculatedStats
