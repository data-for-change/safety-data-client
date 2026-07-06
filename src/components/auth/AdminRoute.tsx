import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/storeConfig';
import { Loader } from '../common';

interface AdminRouteProps {
	children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = observer(({ children }) => {
	const { userStore } = useStore();

	if (userStore.isLoading) {
		return <Loader />;
	}

	if (!userStore.isAuthenticated) {
		return (
			<div
				className='d-flex flex-column align-items-center justify-content-center'
				style={{ minHeight: '400px', gap: '20px' }}
			>
				<span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--bs-body-color)' }}>
					Admin access requires login
				</span>
				<Button variant='success' onClick={() => userStore.login()}>
					Login with Google
				</Button>
			</div>
		);
	}

	if (!userStore.isAdmin) {
		return <Navigate to='/' replace />;
	}

	return <>{children}</>;
});

export default AdminRoute;
