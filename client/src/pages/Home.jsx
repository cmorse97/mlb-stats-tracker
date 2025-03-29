import { Container, Typography } from '@mui/material'
import Teams from '../components/Teams'

const Home = () => {
	return (
		<>
			<Container maxWidth='lg'>
				<Typography
					variant='h2'
					sx={{ marginTop: 4, marginBottom: 4, textAlign: 'center' }}
				>
					Welcome to the MLB Stats Tracker App
				</Typography>
				<Typography variant='h5' textAlign='center' sx={{ marginBottom: 4 }}>
					Click a team to view their stats
				</Typography>
				<Container>
					<Teams />
				</Container>
			</Container>
		</>
	)
}

export default Home
