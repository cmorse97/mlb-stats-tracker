import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Standings from '../pages/Standings'
import Top100 from '../pages/Top100'
import Analytics from '../pages/Analytics'
import ErrorPage from '../pages/ErrorPage'
import RosterPage from '../pages/RosterPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />, // Navbar will always be present
		children: [
			{ index: true, element: <Home /> },
			{ path: 'standings', element: <Standings /> },
			{ path: 'top100', element: <Top100 /> },
			{ path: 'analytics', element: <Analytics /> },
			{ path: '/teams/:teamAbv', element: <RosterPage /> }
		]
	}
])

export default router
