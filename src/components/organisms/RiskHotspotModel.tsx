import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react';
import { Loader } from '../common';

const EnvelopeIcon = ({ color = 'white', size = 20 }: { color?: string; size?: number }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		style={{ marginLeft: '10px', verticalAlign: 'middle' }}
	>
		<path
			d='M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z'
			stroke={color}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path d='M22 6L12 13L2 6' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

const RiskHotspotModel = observer(() => {
	const { t } = useTranslation();
	const { userStore } = useStore();

	if (userStore.isLoading) {
		return <Loader />;
	}

	const hasPermission = userStore.isAuthenticated && userStore.hasEditPermission;

	if (hasPermission) {
		return (
			<div>
				<h1>{t('RiskModel')}</h1>
			</div>
		);
	}

	return (
		<div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '400px', gap: '20px' }}>
			<Button
				variant='success'
				className='rounded-3 px-5 py-3 shadow-sm'
				style={{
					backgroundColor: '#00FF00',
					border: 'none',
					color: 'black',
					fontWeight: '500',
					fontSize: '1.2rem',
					width: '320px',
					borderRadius: '15px',
				}}
				onClick={() => userStore.login()}
			>
				{t('LoginOrSwitchUser')}
			</Button>
			<Button
				variant='dark'
				className='rounded-3 px-5 py-3 d-flex align-items-center justify-content-center shadow-sm'
				style={{
					backgroundColor: '#4E6A5C',
					border: 'none',
					fontSize: '1.2rem',
					width: '320px',
					borderRadius: '15px',
				}}
				href='mailto:gal@natoon.co.il'
			>
				<EnvelopeIcon />
				{t('ContactForMoreDetails')}
			</Button>
		</div>
	);
});

export default RiskHotspotModel;
