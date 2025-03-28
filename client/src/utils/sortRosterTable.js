const positionIndex = {
	C: 1,
	'1B': 2,
	'2B': 3,
	'3B': 4,
	SS: 5,
	LF: 6,
	CF: 7,
	RF: 8,
	DH: 9,
	P: 10
}

export const sortRosterTable = (data, sortBy, sortDirection) => {
	return data.slice().sort((a, b) => {
		if (sortBy === 'pos') {
			return sortDirection === 'asc'
				? positionIndex[a[sortBy]] - positionIndex[b[sortBy]]
				: positionIndex[b[sortBy]] - positionIndex[a[sortBy]]
		} else if (sortBy === 'longName') {
			const lastNameA = a[sortBy].includes(' ')
				? a[sortBy].split(' ').pop()
				: a[sortBy]
			const lastNameB = b[sortBy].includes(' ')
				? b[sortBy].split(' ').pop()
				: b[sortBy]
			const comparison = lastNameA.localeCompare(lastNameB)
			return sortDirection === 'asc' ? comparison : -comparison
		} else if (sortBy === 'jerseyNum') {
			return sortDirection === 'asc'
				? parseInt(a[sortBy]) - parseInt(b[sortBy])
				: parseInt(b[sortBy]) - parseInt(a[sortBy])
		} else {
			const comparison = a[sortBy] - b[sortBy]
			return sortDirection === 'asc' ? comparison : -comparison
		}
	})
}
