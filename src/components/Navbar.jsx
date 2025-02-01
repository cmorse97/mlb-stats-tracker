import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useScrollTrigger } from '@mui/material'
import MultilineChart from '@mui/icons-material/MultilineChart'

const pages = ['Teams', 'Top 100', 'Analytics']
const settings = ['Profile', 'Account', 'Logout']

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null)
	const [anchorElUser, setAnchorElUser] = React.useState(null)

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	function ElevationScroll(props) {
		const { children, window } = props
		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
			target: window ? window() : undefined
		})

		return children
			? React.cloneElement(children, { elevation: trigger ? 4 : 0 })
			: null
	}

	return (
		<ElevationScroll elevation={4}>
			<AppBar position='sticky'>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<MultilineChart
							sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
						/>
						<Typography
							variant='h6'
							noWrap
							component='a'
							href='/'
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontWeight: 700,
								letterSpacing: '.125rem',
								color: 'inherit',
								textDecoration: 'none'
							}}
						>
							MLB Stats Tracker
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='inherit'
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left'
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{ display: { xs: 'block', md: 'none' } }}
							>
								{pages.map(page => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography sx={{ textAlign: 'center' }}>{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<MultilineChart
							sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
						/>
						<Typography
							variant='h5'
							noWrap
							component='a'
							href='/'
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontWeight: 700,
								letterSpacing: '.125rem',
								color: 'inherit',
								textDecoration: 'none'
							}}
						>
							MLB Stats Tracker
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map(page => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page}
								</Button>
							))}
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map(setting => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography sx={{ textAlign: 'center' }}>
											{setting}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</ElevationScroll>
	)
}
export default ResponsiveAppBar
