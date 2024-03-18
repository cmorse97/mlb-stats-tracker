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
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link to='/'>MLB Stats Tracker</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
