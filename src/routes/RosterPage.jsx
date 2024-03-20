import { useState } from 'react'
import { Container, Modal } from '@mui/material'
import Navbar from '../components/Navbar'
import TeamStats from '../components/TeamStats'
import RosterTable from '../components/RosterTable'
import TopPerformers from '../components/TopPerformers'
import PlayerModal from '../components/PlayerModal'

const RosterPage = () => {
	const [playerData, setPlayerData] = useState()
	const [playerModalOpen, setPlayerModalOpen] = useState(false)
	const handlePlayerModalOpen = () => setPlayerModalOpen(true)
	const handlePlayerModalClose = () => setPlayerModalOpen(false)

	return (
		<>
			<Navbar />
			<Container maxWidth='lg' sx={{ marginY: '2em' }}>
				<TeamStats />
				<TopPerformers />
				<RosterTable
					setPlayerData={setPlayerData}
					handlePlayerModalOpen={handlePlayerModalOpen}
				/>
				<Container maxWidth='lg' my={8}>
					<Modal open={playerModalOpen} onClose={handlePlayerModalClose}>
						<PlayerModal
							setPlayerData={playerData}
							handlePlayerModalClose={handlePlayerModalClose}
						/>
					</Modal>
				</Container>
			</Container>
		</>
	)
}

export default RosterPage
