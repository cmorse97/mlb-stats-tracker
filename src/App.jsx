import { useState, useEffect } from 'react'
import Teams from './components/Teams'

const App = () => {
	return (
		<div className='h-screen bg-neutral-200'>
			<div className='flex justify-center items-center bg-blue-800 h-40'>
				<h1 className='text-center text-white font-bold text-6xl drop-shadow-xl'>
					MLB Stats Tracker
				</h1>
			</div>
			<div className='flex flex-col justify-center items-center gap-12 mt-4 md:mt-16'>
				<h2>Teams:</h2>
				<Teams />
			</div>
		</div>
	)
}

export default App
