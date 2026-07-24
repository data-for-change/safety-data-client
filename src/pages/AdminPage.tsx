import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
	Container,
	Form,
	Button,
	Spinner,
	Table,
	ToastContainer,
	Toast,
	Alert,
	Tabs,
	Tab,
} from 'react-bootstrap';
import { useStore } from '../stores/storeConfig';
import UserGrantsTab from '../components/admin/UserGrantsTab';
import './AdminPage.css';

type AdminTab = 'grant-users' | 'grants';

const AdminPage: React.FC = observer(() => {
	const { grantStore } = useStore();
	const {
		grants,
		loading,
		successMessage,
		errorMessage,
		fetchGrants,
		createGrant,
		clearMessages,
	} = grantStore;

	const [activeTab, setActiveTab] = React.useState<AdminTab>('grant-users');
	const [createName, setCreateName] = React.useState('');
	const [createDescription, setCreateDescription] = React.useState('');

	useEffect(() => {
		fetchGrants();
	}, [fetchGrants]);

	useEffect(() => {
		if (successMessage || errorMessage) {
			const timeout = setTimeout(() => clearMessages(), 3000);
			return () => clearTimeout(timeout);
		}
	}, [successMessage, errorMessage, clearMessages]);

	const handleCreateGrant = async (e: React.FormEvent) => {
		e.preventDefault();
		await createGrant({ name: createName.trim(), description: createDescription.trim() });
		setCreateName('');
		setCreateDescription('');
	};

	return (
		<Container className='py-4 admin-page' dir='ltr'>
			<h2 className='mb-4'>Grant Management</h2>

			<Tabs
				activeKey={activeTab}
				onSelect={(key) => setActiveTab(key as AdminTab)}
				id='admin-grant-tabs'
				className='mb-4'
			>
				<Tab eventKey='grant-users' title='User Grants'>
					<UserGrantsTab />
				</Tab>

				<Tab eventKey='grants' title='Grants'>
					<h4 className='mb-3 mt-3'>Grants</h4>
					{loading ? (
						<Spinner animation='border' />
					) : grants.length === 0 ? (
						<Alert variant='info'>No grants found.</Alert>
					) : (
						<Table striped bordered hover responsive className='mb-4'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{grants.map((grant) => (
									<tr key={grant.id}>
										<td>{grant.name}</td>
										<td>{grant.description}</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}

					<h4 className='mb-3'>Create Grant</h4>
					<Form onSubmit={handleCreateGrant}>
						<Form.Group className='mb-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								value={createName}
								onChange={(e) => setCreateName(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={2}
								value={createDescription}
								onChange={(e) => setCreateDescription(e.target.value)}
								required
							/>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Create Grant
						</Button>
					</Form>
				</Tab>
			</Tabs>

			<ToastContainer position='top-center' className='p-3 custom-toast-container' style={{ zIndex: 1100 }}>
				{successMessage && (
					<Toast show onClose={clearMessages} bg='success' autohide delay={3000}>
						<Toast.Body style={{ color: 'white' }}>{successMessage}</Toast.Body>
					</Toast>
				)}
				{errorMessage && (
					<Toast show onClose={clearMessages} bg='danger' autohide delay={3000}>
						<Toast.Body>{errorMessage}</Toast.Body>
					</Toast>
				)}
			</ToastContainer>
		</Container>
	);
});

export default AdminPage;
