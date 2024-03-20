import {
	AppBar,
	Box,
	Typography,
	Toolbar,
	Container,
	Icon
} from '@mui/material'
import { SportsBaseball } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Container maxWidth='lg'>
						<Typography
							variant='h6'
							py={4}
							component='div'
							sx={{ flexGrow: 1 }}
						>
							<Link to='/'>MLB Stats Tracker</Link>
						</Typography>
					</Container>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
