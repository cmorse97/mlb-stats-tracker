import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemText,
	useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MultilineChartIcon from '@mui/icons-material/MultilineChart'

const pages = [
	{ name: 'Standings', path: 'standings' },
	{ name: 'Top 100', path: 'top100' },
	{ name: 'Analytics', path: 'analytics' }
]

const Navbar = () => {
	const isMobile = useMediaQuery('(max-width: 600px)')
	const [mobileOpen, setMobileOpen] = useState(false)

	// Toggle Drawer (Mobile Menu)
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					{/* Logo / App Name */}
					<Link
						to='/'
						style={{ textDecoration: 'none', color: '#fff', flexGrow: 1 }}
					>
						<Box display='flex' alignItems='center' gap={1}>
							<MultilineChartIcon fontSize='large' />
							<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
								MLB Stats Tracker
							</Typography>
						</Box>
					</Link>

					{/* Desktop Navigation (Shown on medium & larger screens) */}
					{!isMobile ? (
						<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							{pages.map(page => (
								<Button key={page.name} sx={{ color: '#fff' }}>
									<Link
										to={`/${page.path}`}
										style={{ color: '#fff', textDecoration: 'none' }}
									>
										{page.name}
									</Link>
								</Button>
							))}
						</Box>
					) : (
						// Mobile Menu Button (Hamburger)
						<IconButton color='inherit' onClick={handleDrawerToggle}>
							<MenuIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>

			{/* Mobile Drawer Menu */}
			<Drawer
				anchor='right'
				open={mobileOpen}
				onClose={handleDrawerToggle}
				transitionDuration={500}
				sx={{
					flexShrink: 0,
					'& .MuiDrawer-paper': { width: '33%', boxSizing: 'border-box' }
				}}
			>
				<List>
					{pages.map(page => (
						<ListItem button key={page.name} onClick={handleDrawerToggle}>
							<Link
								to={`/${page.path}`}
								style={{
									textDecoration: 'none',
									color: 'inherit',
									width: '100%'
								}}
							>
								<ListItemText primary={page.name} />
							</Link>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	)
}

export default Navbar
