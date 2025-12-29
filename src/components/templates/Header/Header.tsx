import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import LanguageSelector from '../../molecules/LanguageSelector';
import NavigationList from '../../molecules/NavigationList';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/logo/safety-logo-white.png';
import { RootState, AppDispatch } from '../../../stores/store';
import { setHeaderExpanded } from '../../../stores';
import { useStore } from '../../../stores/storeConfig';
import { FeatureFlags, isFeatureEnabled } from '../../../utils/featureFlags';
import '../../../styles/tabs.css';
import './header.css';

interface IProps {
	title: string;
}

const Header: React.FC<IProps> = observer(({ title }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();
	const { isHeaderExpanded } = useSelector((state: RootState) => state.appUi);
	const { userStore } = useStore();
	const { isAuthenticated, user } = userStore;

	const toggleHeaderExpanded = () => {
		dispatch(setHeaderExpanded(!isHeaderExpanded));
	};

	const onLoginHandler = () => {
		if (isAuthenticated) {
			userStore.logout();
		} else {
			userStore.login();
		}
	};

	const UserIcon = () => (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='18'
			fill='currentColor'
			className='bi bi-person-circle'
			viewBox='0 0 16 16'
			style={{ marginInlineStart: '8px' }}
		>
			<path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
			<path
				fillRule='evenodd'
				d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
			/>
		</svg>
	);

	const loginText = isAuthenticated ? t('Logout') : t('Login');

	return (
		<header className='header'>
			<Navbar className='navbar' expand='lg' expanded={isHeaderExpanded} onToggle={toggleHeaderExpanded}>
				<div className='container-fluid'>
					<img src={logo} alt={`${title} logo`} height='25' width='150' />
					<Navbar.Toggle aria-controls='basic-navbar-nav' className='text-light' data-testid='navbar-toggle' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<div className='navbar-nav'>
							<NavigationList />
						</div>

						<div className='d-flex align-items-center ms-auto'>
							{isFeatureEnabled(FeatureFlags.AUTH) && (
								<div className='me-3'>
									<Button
										variant='outline-light'
										size='sm'
										className='d-flex align-items-center px-3 gap-2'
										onClick={onLoginHandler}
										style={{ borderRadius: '20px', fontWeight: 500 }}
									>
										{loginText}
										{isAuthenticated && user?.oauth_provider_user_picture_url ? (
											<img src={user?.oauth_provider_user_picture_url || ''} 
											alt='user' 
											style={{ width: 18, height: 18, borderRadius: '5%' }}
											/>
										) : (
											<UserIcon />
										)}
									</Button>
								</div>
							)}
							<div style={{ marginTop: '8px' }}>
								<LanguageSelector />
							</div>
						</div>
					</Navbar.Collapse>
				</div>
			</Navbar>
		</header>
	);
});

export default Header;
