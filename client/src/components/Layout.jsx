import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet /> {/* Renders the current route's content */}
		</>
	)
}

export default Layout
