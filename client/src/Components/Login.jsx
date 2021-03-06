import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
			history.push('/');
		} catch {
			setError('Failed to log in');
		}

		setLoading(false);
	}

	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Card>
					<Card.Body>
						<h2 className='text-center mb-4'>Log In</h2>
						{error && <Alert variant='danger'>{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control type='email' required ref={emailRef} />
							</Form.Group>

							<Form.Group id='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control type='password' required ref={passwordRef} />
							</Form.Group>

							<Button disabled={loading} type='submit' className='mt-2 w-100'>
								Log In
							</Button>
						</Form>
						<div className='w-100 text-center mt-3'>
							<Link className='linkinWhite' to='/forgot-password'>
								Forgot password?
							</Link>
						</div>
					</Card.Body>
				</Card>
				<div className='w-100 text-center text-white mt-2'>
					Need an account?{' '}
					<Link className='linkinBlack' to='/signup'>
						Sign up
					</Link>
				</div>
			</div>
		</Container>
	);
}
