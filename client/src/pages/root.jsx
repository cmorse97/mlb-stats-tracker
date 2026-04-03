import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Standings from '../pages/Standings'
import ErrorPage from '../pages/ErrorPage'
import RosterPage from '../pages/RosterPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'standings', element: <Standings /> },
			{ path: '/teams/:teamAbv', element: <RosterPage /> }
		]
	}
])

export default router
