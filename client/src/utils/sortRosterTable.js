const positionIndex = {
	C: 1,
	'1B': 2,
	'2B': 3,
	'3B': 4,
	SS: 5,
	IF: 5,
	LF: 6,
	CF: 7,
	RF: 8,
	OF: 8,
	DH: 9,
	P: 10
}

const swap = (arr, idx1, idx2) => {
	let temp = arr[idx1] // swap elements
	arr[idx1] = arr[idx2]
	arr[idx2] = temp
}

const compareValues = (a, b, key, descending) => {
	let valueA = a[key]
	let valueB = b[key]

	// Convert jersey_number to integer for proper sorting
	if (key === 'jersey_number') {
		valueA = Number(valueA)
		valueB = Number(valueB)
	}

	// Convert position to index-based sorting
	if (key === 'position') {
		valueA = positionIndex[valueA] || 99
		valueB = positionIndex[valueB] || 99
	}

	// String comparison for names
	if (typeof valueA === 'string' && typeof valueB === 'string') {
		return descending
			? valueB.localeCompare(valueA)
			: valueA.localeCompare(valueB)
	}

	return descending ? valueB - valueA : valueA - valueB
}

const pivot = (
	arr,
	left = 0,
	right = arr.length - 1,
	key,
	descending = false
) => {
	const pivotValue = arr[left]
	let swapIndex = left

	for (let i = left + 1; i <= right; i++) {
		if (compareValues(arr[i], pivotValue, key, descending) < 0) {
			swapIndex++
			swap(arr, swapIndex, i)
		}
	}

	swap(arr, left, swapIndex)
	return swapIndex
}

export const quickSortRoster = (
	arr,
	key,
	descending = false,
	left = 0,
	right = arr.length - 1
) => {
	if (left < right) {
		const pivotIndex = pivot(arr, left, right, key, descending)
		quickSortRoster(arr, key, descending, left, pivotIndex - 1)
		quickSortRoster(arr, key, descending, pivotIndex + 1, right)
	}

	return arr
}
