import React, { useState } from 'react';
import { Tab, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function Sidebar() {
	const [modalOpen, setModalOpen] = useState(false);
	const { currentUser } = useAuth();
	const history = useHistory();

	function closeModal() {
		setModalOpen(false);
	}

	return (
		<div className='d-flex flex-columnd-flex flex-column sidebar'>
			<Tab.Container>
				<Tab.Content className='border-right overflow-auto flex-grow-1'></Tab.Content>
				<div className='p-2 border-top text-white border-right smallText'>
					Your Id: <span className='mutedText idText'>{currentUser.uid}</span>
				</div>
				<Button onClick={() => setModalOpen(true)}>New Contact</Button>
				<Button onClick={() => history.push('/')} className='mt-2'>
					Dashboard
				</Button>
			</Tab.Container>

			<Modal show={modalOpen} onHide={closeModal}>
				<div></div>
			</Modal>
		</div>
	);
}
