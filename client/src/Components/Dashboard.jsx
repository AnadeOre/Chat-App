import React, { useState } from 'react';
import { Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Dashboard() {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useHistory();

	async function handleLogOut() {
		setError('');
		try {
			await logout();
			history.push('/login');
		} catch {
			setError('Failed to log out');
		}
	}

	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Card>
					<Card.Body>
						<div>
							<h2 className='text-center mb-4'>Profile</h2>
							{error && <Alert variant='danger'>{error}</Alert>}
							<strong>Email: </strong>
							{currentUser.email}
						</div>
						<div>
							<strong>User ID: </strong>
							{currentUser.uid}
						</div>
						<div>
							<strong>Username: </strong>
							{currentUser.displayName}
						</div>
						<img
							alt='Profile Pic'
							className='profPic'
							src={currentUser.photoURL}
							width='200'
							height='200px'
						/>
						<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
							Update Profile
						</Link>
						<Link to='/chat' className='btn btn-primary w-100 mt-3'>
							Go to chat
						</Link>
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2'>
					<Button className='linkinBlack' variant='link' onClick={handleLogOut}>
						Log out
					</Button>
				</div>
			</div>
		</Container>
	);
}
