import { makeAutoObservable, runInAction } from 'mobx';
import RootStore from '../RootStore';
import AuthService from '../../services/AuthService';
import { isFeatureEnabled, FeatureFlags } from '../../utils/featureFlags';
import { IUser } from '../../types/User';

export default class UserStore {
	user: IUser | null = null;
	isLoading: boolean = false;
	rootStore: RootStore;
	private authService: AuthService;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		this.authService = new AuthService();
		makeAutoObservable(this);
		this.checkAuthStatus();
	}

	async checkAuthStatus() {
		this.isLoading = true;
		if (!isFeatureEnabled(FeatureFlags.AUTH)) {
			return;
		}
		try {
			const response = await this.authService.isLoggedIn();
			if (response.data.is_user_logged_in) {
				await this.fetchUserInfo();
			} else {
				runInAction(() => {
					this.user = null;
				});
			}
		} catch (err) {
			console.error('Auth check failed', err);
		} finally {
			runInAction(() => {
				this.isLoading = false;
			});
		}
	}

	async fetchUserInfo() {
		try {
			const response = await this.authService.getUserInfo();
			runInAction(() => {
				const data = response.data;
				this.user = {
					app: data.app,
					id: data.id,
					email: data.email,
					first_name: data.first_name,
					last_name: data.last_name,
					full_name: data.first_name ? `${data.first_name} ${data.last_name || ''}`.trim() : data.email,
					role: data.roles?.[0] || 'authenticated',
					roles: data.roles,
					oauth_provider: data.oauth_provider,
					oauth_provider_user_name: data.oauth_provider_user_name,
					oauth_provider_user_picture_url: data.oauth_provider_user_picture_url,
					phone: data.phone,
					user_desc: data.user_desc,
					user_register_date: data.user_register_date,
					user_type: data.user_type,
					user_url: data.user_url,
					is_active: data.is_active,
					is_user_completed_registration: data.is_user_completed_registration,
					organizations: data.organizations,
					grants: data.grants,
				};
			});
		} catch (err) {
			console.error('Failed to fetch user info', err);
		}
	}

	/**
	 * Documentation Flow: Initiates the redirect to the backend auth endpoint.
	 * We use a popup window to handle the redirect cycle so the user doesn't leave the current page.
	 */
	private popupWindow: Window | null = null;

	login() {
		const width = 500;
		const height = 650;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;
		const name = 'Google Authentication';
		const strWindowFeatures = `toolbar=no, menubar=no, width=${width}, height=${height}, top=${top}, left=${left}, status=no, resizable=yes, scrollbars=yes`;

		// Use the specific trusted route name from the Anyway app config
		const redirectUrl = window.location.origin + '/login-popup-redirect';
		const authUrl = this.authService.getAuthorizeUrl(redirectUrl);

		// Remove any existing event listeners before adding a new one
		window.removeEventListener('message', this.handleAuthMessage);
		window.addEventListener('message', this.handleAuthMessage);

		if (this.popupWindow === null || this.popupWindow.closed) {
			this.popupWindow = window.open(authUrl, name, strWindowFeatures);
		} else {
			this.popupWindow.focus();
			if (this.popupWindow.location.origin !== window.location.origin) {
				this.popupWindow.location.href = authUrl;
			}
		}

		// Fallback: Check if popup was closed manually
		const checkPopup = setInterval(() => {
			if (!this.popupWindow || this.popupWindow.closed) {
				clearInterval(checkPopup);
				this.checkAuthStatus();
			}
		}, 1000);
	}

	private handleAuthMessage = (event: MessageEvent) => {
		// Verify the origin for security as per provided Anyway app code
		if (event.origin !== window.location.origin) {
			console.warn('Authentication redirect origin is not valid');
			return;
		}

		if (event.data === 'login-success') {
			console.info('authentication success!, redirect to main page...');
			if (this.popupWindow) {
				this.popupWindow.close();
			}
			window.removeEventListener('message', this.handleAuthMessage);

			// Refresh the app to ensure all stores and cookies are in sync
			window.location.pathname = '/';
		}
	};

	async logout() {
		try {
			await this.authService.logout();
			runInAction(() => {
				this.user = null;
			});
		} catch (err) {
			console.error('Logout failed', err);
		}
	}

	get isAuthenticated() {
		return this.user !== null;
	}

	get isAdmin() {
		return this.user?.roles?.includes('admins') || this.user?.role === 'admin';
	}

	get isEditor() {
		return this.user?.roles?.includes('editor') || this.user?.role === 'editor';
	}

	get hasEditPermission() {
		return this.isAdmin || this.isEditor;
	}
}
