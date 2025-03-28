import Teams from '../components/Teams'
import Navbar from '../components/Navbar'
import { Box, Container, Typography } from '@mui/material'

const Root = () => {
	return (
		<>
			{/* Implement responsive layout */}
			<Navbar />
			<Container maxWidth='lg'>
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					gap={8}
					my={4}
				>
					<Typography variant='h5'>Pick a team to view roster</Typography>
					<Teams />
				</Box>
			</Container>
		</>
	)
}

export default Root
