import { Link, useRouteError } from 'react-router-dom'
import { Container, Box, Typography } from '@mui/material'

const ErrorPage = () => {
	const error = useRouteError()
	console.error(error)

	return (
		<Container maxWidth='lg'>
			<Box
				display='flex'
				flexDirection='column'
				gap={2}
				marginTop={16}
				justifyContent='center'
				alignItems='center'
			>
				<Typography variant='h1'>Oops!</Typography>
				<Typography variant='h5'>
					Sorry, an unexpected error has occurred.
				</Typography>
				<Typography>
					<i>{error.statusText || error.message}</i>
				</Typography>
				<Typography color={'blue'}>
					<Link to='/'>Go back home.</Link>
				</Typography>
			</Box>
		</Container>
	)
}

export default ErrorPage
