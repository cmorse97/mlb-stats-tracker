import { useState } from 'react'
import { Container, Modal } from '@mui/material'
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
			<Container maxWidth='lg' sx={{ marginY: '12px' }}>
				<TeamStats />
				<TopPerformers />
				<RosterTable
					setPlayerData={setPlayerData}
					handlePlayerModalOpen={handlePlayerModalOpen}
				/>
				<Container maxWidth='lg'>
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
