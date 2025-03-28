const statKeyMap = {
	GP: 'gamesPlayed',
	GS: 'gamesStarted',
	Pitching: {
		W: 'Pitching.Win',
		L: 'Pitching.Loss',
		WHIP: 'Pitching.WHIP',
		IP: 'Pitching.InningsPitched',
		H: 'Pitching.H',
		HR: 'Pitching.HR',
		BB: 'Pitching.BB',
		SO: 'Pitching.SO',
		R: 'Pitching.R',
		ER: 'Pitching.ER',
		SV: 'Pitching.Save',
		BS: 'Pitching.BlownSave',
		HOLD: 'Pitching.Hold',
		WP: 'Pitching.Wild Pitch'
	},
	Hitting: {
		AB: 'Hitting.AB',
		H: 'Hitting.H',
		R: 'Hitting.R',
		'2B': 'Hitting.2B',
		'3B': 'Hitting.3B',
		HR: 'Hitting.HR',
		RBI: 'Hitting.RBI',
		BB: 'Hitting.BB',
		SO: 'Hitting.SO',
		AVG: 'Hitting.avg',
		HBP: 'Hitting.HBP',
		SF: 'Hitting.SF',
		TB: 'Hitting.TB'
	}
}

export default statKeyMap
