import Teams from '../components/Teams'

const Root = () => {
	return (
		<div className='h-screen bg-neutral-200'>
			<div className='flex items-center justify-center h-40 bg-blue-800'>
				<h1 className='text-6xl font-bold text-center text-white drop-shadow-xl'>
					MLB Stats Tracker
				</h1>
			</div>
			<div className='flex flex-col items-center justify-center gap-12 mt-4 md:mt-16'>
				<h2>Teams:</h2>
				<Teams />
			</div>
		</div>
	)
}

export default Root
