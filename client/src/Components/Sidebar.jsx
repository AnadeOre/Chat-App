import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export default function Sidebar() {
	const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
	const [modalOpen, setModalOpen] = useState(false);
	const conversationsOpen = activeKey === CONVERSATIONS_KEY;

	function closeModal() {
		setModalOpen(false);
	}

	return (
		<div className='d-flex flex-columnd-flex flex-column sidebar'>
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				<Nav variant='tabs' className='justify-content-center'>
					<Nav.Item>
						<Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content className='border-right overflow-auto flex-grow-1'>
					<Tab.Pane eventKey={CONVERSATIONS_KEY}>
						<div></div>
					</Tab.Pane>
					<Tab.Pane eventKey={CONTACTS_KEY}>
						<div></div>
					</Tab.Pane>
				</Tab.Content>
				<div className='p-2 border-top border-right small'>
					Your Id: <span className='text-muted'>id</span>
				</div>
				<Button onClick={() => setModalOpen(true)} className='rounded-0'>
					New {conversationsOpen ? 'Conversation' : 'Contact'}
				</Button>
			</Tab.Container>

			<Modal show={modalOpen} onHide={closeModal}>
				{conversationsOpen ? <div></div> : <div></div>}
			</Modal>
		</div>
	);
}
