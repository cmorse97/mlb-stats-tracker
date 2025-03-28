import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/root.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import RosterPage from './pages/RosterPage.jsx'
import './index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />
	},
	{
		path: '/team/:teamAbv',
		element: <RosterPage />,
		errorElement: <ErrorPage />
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
