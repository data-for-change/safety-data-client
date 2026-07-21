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
} from 'react-bootstrap';
import { useStore } from '../stores/storeConfig';

const AdminPage: React.FC = observer(() => {
	const { grantStore } = useStore();
	const {
		grants,
		loading,
		successMessage,
		errorMessage,
		fetchGrants,
		createGrant,
		deleteGrant,
		assignGrantToUser,
		removeGrantFromUser,
		clearMessages,
	} = grantStore;

	const [createName, setCreateName] = React.useState('');
	const [createDescription, setCreateDescription] = React.useState('');
	const [assignEmail, setAssignEmail] = React.useState('');
	const [assignGrant, setAssignGrant] = React.useState('');
	const [removeEmail, setRemoveEmail] = React.useState('');
	const [removeGrant, setRemoveGrant] = React.useState('');

	useEffect(() => {
		fetchGrants();
	}, [fetchGrants]);

	useEffect(() => {
		if (successMessage || errorMessage) {
			const timeout = setTimeout(() => clearMessages(), 3000);
			return () => clearTimeout(timeout);
		}
	}, [successMessage, errorMessage, clearMessages]);

	useEffect(() => {
		if (grants.length > 0 && !assignGrant) {
			setAssignGrant(grants[0].name);
		}
		if (grants.length > 0 && !removeGrant) {
			setRemoveGrant(grants[0].name);
		}
	}, [grants, assignGrant, removeGrant]);

	const handleCreateGrant = async (e: React.FormEvent) => {
		e.preventDefault();
		await createGrant({ name: createName.trim(), description: createDescription.trim() });
		setCreateName('');
		setCreateDescription('');
	};

	const handleAssignGrant = async (e: React.FormEvent) => {
		e.preventDefault();
		await assignGrantToUser({ email: assignEmail.trim(), grant: assignGrant });
		setAssignEmail('');
	};

	const handleRemoveGrant = async (e: React.FormEvent) => {
		e.preventDefault();
		await removeGrantFromUser({ email: removeEmail.trim(), grant: removeGrant });
		setRemoveEmail('');
	};

	const handleDeleteGrant = async (grantName: string) => {
		if (window.confirm(`Delete grant "${grantName}"? This will remove all user associations.`)) {
			await deleteGrant(grantName);
		}
	};

	return (
		<Container className='py-4'>
			<h2 className='mb-4'>Grant Management</h2>

			<h4 className='mb-3'>Grants</h4>
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
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{grants.map((grant) => (
							<tr key={grant.id}>
								<td>{grant.name}</td>
								<td>{grant.description}</td>
								<td>
									<Button
										variant='danger'
										size='sm'
										onClick={() => handleDeleteGrant(grant.name)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}

			<h4 className='mb-3'>Create Grant</h4>
			<Form onSubmit={handleCreateGrant} className='mb-4'>
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

			<h4 className='mb-3'>Assign Grant to User</h4>
			<Form onSubmit={handleAssignGrant} className='mb-4'>
				<Form.Group className='mb-3'>
					<Form.Label>User Email</Form.Label>
					<Form.Control
						type='email'
						value={assignEmail}
						onChange={(e) => setAssignEmail(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Grant</Form.Label>
					<Form.Select value={assignGrant} onChange={(e) => setAssignGrant(e.target.value)} required>
						{grants.map((grant) => (
							<option key={grant.id} value={grant.name}>
								{grant.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Button type='submit' variant='primary' disabled={grants.length === 0}>
					Assign Grant
				</Button>
			</Form>

			<h4 className='mb-3'>Remove Grant from User</h4>
			<Form onSubmit={handleRemoveGrant} className='mb-4'>
				<Form.Group className='mb-3'>
					<Form.Label>User Email</Form.Label>
					<Form.Control
						type='email'
						value={removeEmail}
						onChange={(e) => setRemoveEmail(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Grant</Form.Label>
					<Form.Select value={removeGrant} onChange={(e) => setRemoveGrant(e.target.value)} required>
						{grants.map((grant) => (
							<option key={grant.id} value={grant.name}>
								{grant.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Button type='submit' variant='warning' disabled={grants.length === 0}>
					Remove Grant
				</Button>
			</Form>

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
