import statKeyMap from './statKeyMap'

export const getStatValue = (playerData, key) => {
	if (!playerData) {
		return null
	} else if (playerData.pos === 'P') {
		const mappedKey = statKeyMap.Pitching[key] || statKeyMap[key]
		return mappedKey.split('.').reduce((obj, i) => obj[i], playerData?.stats)
	} else {
		const mappedKey = statKeyMap.Hitting[key] || statKeyMap[key]
		return mappedKey.split('.').reduce((obj, i) => obj[i], playerData?.stats)
	}
}
