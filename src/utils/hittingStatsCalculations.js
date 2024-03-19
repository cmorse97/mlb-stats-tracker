export const calculateSlugging = playerData => {
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

export const calculatePlateAppearances = playerData => {
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

export const calculateOBP = playerData => {
	const hits = Number(playerData?.stats.Hitting.H)
	const walks = Number(playerData?.stats.Hitting.BB)
	const hitByPitch = Number(playerData?.stats.Hitting.HBP)
	const ab = Number(playerData?.stats.Hitting.AB)
	const sf = Number(playerData?.stats.Hitting.SF)
	const obp = (hits + walks + hitByPitch) / (ab + walks + hitByPitch + sf)
	return obp.toFixed(3).replace(/^0/, '')
}

export const calculateOPS = playerData => {
	const obp = Number(calculateOBP(playerData))
	const slg = Number(calculateSlugging(playerData))
	const ops = obp + slg
	return ops.toFixed(3).replace(/^0/, '')
}
