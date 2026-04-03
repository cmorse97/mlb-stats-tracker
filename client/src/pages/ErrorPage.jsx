import { Link, useRouteError } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-800">Oops!</h1>
        <p className="text-lg text-gray-500">Sorry, an unexpected error has occurred.</p>
        <p className="text-sm text-gray-400 italic">{error?.statusText || error?.message}</p>
        <Link
          to="/"
          className="mt-2 text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors"
        >
          ← Go back home
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
