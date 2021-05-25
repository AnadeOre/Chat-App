import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const picRef = useRef();
	const usernameRef = useRef();
	const passwordConfirmRef = useRef();
	const { updatePassword, updateEmail, currentUser, updateUsername, updatePic } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();

		setLoading(true);
		setError('');

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		const promises = [];
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		if (usernameRef.current.value) {
			promises.push(updateUsername(usernameRef.current.value));
		}

		if (picRef.current.value) {
			promises.push(updatePic(picRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				setError('Failed to update Account');
			})
			.finally(() => {
				setLoading(false);
			});

		setLoading(false);
	}

	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Card>
					<Card.Body>
						<h2 className='text-center mb-4'>Update Profile</h2>
						{error && <Alert variant='danger'>{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id='username'>
								<Form.Label>Username</Form.Label>
								<Form.Control
									placeholder='Leave blank to not update'
									type='name'
									ref={usernameRef}
								/>
							</Form.Group>
							<Form.Group id='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									defaultValue={currentUser.email}
									ref={emailRef}
									required
								/>
							</Form.Group>
							<Form.Group id='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									placeholder='Leave blank to not update'
									type='password'
									ref={passwordRef}
								/>
							</Form.Group>
							<Form.Group id='password-confirm'>
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control
									type='password'
									placeholder='Leave blank to not update'
									ref={passwordConfirmRef}
								/>
							</Form.Group>

							<Form.Group id='picture'>
								<Form.Label>Profile Picture</Form.Label>
								<Form.Control placeholder='URL to picture' type='name' ref={picRef} />
							</Form.Group>
							<Button disabled={loading} className='w-100 mt-2' type='submit'>
								Update
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2'>
					<Link className='linkinBlack' to='/'>
						Cancel
					</Link>
				</div>
			</div>
		</Container>
	);
}
