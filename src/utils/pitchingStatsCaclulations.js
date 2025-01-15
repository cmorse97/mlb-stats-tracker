export const calculateEarnedRunAverage = (playerData, key) => {
	// 9 X earned runs/innings pitched
	const earnedRuns = Number(playerData?.stats.Pitching.ER)
	const inningsPitched = Number(playerData?.stats.Pitching.InningsPitched)
	const era = 9 * (earnedRuns / inningsPitched)
	return era.toFixed(2)
}
