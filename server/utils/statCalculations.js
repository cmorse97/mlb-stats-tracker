const calculateSlugging = playerData => {
	const hitting = playerData.stats?.Hitting
	if (!hitting) return null

	const H = Number(hitting.H ?? 0)
	const doubles = Number(hitting['2B'] ?? 0)
	const triples = Number(hitting['3B'] ?? 0)
	const HR = Number(hitting.HR ?? 0)
	const AB = Number(hitting.AB ?? 0)

	if (AB === 0) return null

	const singles = H - doubles - triples - HR
	const slg = (singles + 2 * doubles + 3 * triples + 4 * HR) / AB
	return slg.toFixed(3).replace(/^0/, '')
}

const calculatePlateAppearances = playerData => {
	const hitting = playerData.stats?.Hitting
	if (!hitting) return null

	const AB = Number(hitting.AB ?? 0)
	const BB = Number(hitting.BB ?? 0)
	const IBB = Number(hitting.IBB ?? 0)
	const SAC = Number(hitting.SAC ?? 0)
	const HBP = Number(hitting.HBP ?? 0)
	const SF = Number(hitting.SF ?? 0)
	const GIDP = Number(hitting.GIDP ?? 0)

	const pa = AB + BB + IBB + SAC + HBP + SF + GIDP
	return String(pa)
}

const calculateOBP = playerData => {
	const hitting = playerData.stats?.Hitting
	if (!hitting) return null

	const H = Number(hitting.H ?? 0)
	const BB = Number(hitting.BB ?? 0)
	const HBP = Number(hitting.HBP ?? 0)
	const AB = Number(hitting.AB ?? 0)
	const SF = Number(hitting.SF ?? 0)

	const denominator = AB + BB + HBP + SF
	if (denominator === 0) return null

	const obp = (H + BB + HBP) / denominator
	return obp.toFixed(3).replace(/^0/, '')
}

const calculateOPS = playerData => {
	const obp = parseFloat(calculateOBP(playerData)) || 0
	const slg = parseFloat(calculateSlugging(playerData)) || 0
	const ops = obp + slg
	return ops.toFixed(3).replace(/^0/, '')
}

const calculateEarnedRunAverage = playerData => {
	const pitching = playerData.stats?.Pitching
	if (!pitching) return null

	const ER = Number(pitching.ER ?? 0)
	const IP = Number(pitching.InningsPitched ?? 0)

	if (IP === 0) return null

	const era = (9 * ER) / IP
	return era.toFixed(2)
}

const addCalculatedStats = playerData => {
	const stats = playerData.stats
	if (!stats || typeof stats !== 'object') return playerData

	const calculatedHittingStats = {
		SLG: calculateSlugging(playerData),
		PA: calculatePlateAppearances(playerData),
		OBP: calculateOBP(playerData),
		OPS: calculateOPS(playerData)
	}

	const calculatedPitchingStats = {
		ERA: calculateEarnedRunAverage(playerData)
	}

	if (stats.Hitting) {
		stats.Hitting = { ...stats.Hitting, ...calculatedHittingStats }
	}
	if (stats.Pitching) {
		stats.Pitching = { ...stats.Pitching, ...calculatedPitchingStats }
	}

	return playerData
}

export default addCalculatedStats
