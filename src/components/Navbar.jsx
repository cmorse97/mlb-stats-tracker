import {
	AppBar,
	Box,
	Typography,
	Toolbar,
	IconButton,
	Button
} from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						X
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link to='/'>MLB Stats Tracker</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
