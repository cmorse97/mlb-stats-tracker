import { useState, useEffect } from 'react'
import Teams from './components/Teams'

const App = () => {
	return (
		<>
			<h1>MLB Stats Tracker</h1>
			<h2>Teams:</h2>
			<Teams />
		</>
	)
}

export default App
