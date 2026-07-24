import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';
import GrantService from '../../services/GrantService';
import RootStore from '../RootStore';
import { AdminUserInfo } from '../../types/adminUserInfo';
import { Grant, CreateGrantPayload } from '../../types/grant';

export default class GrantStore {
	rootStore: RootStore;
	grants: Grant[] = [];
	loading = false;
	successMessage = '';
	errorMessage = '';

	selectedUser: AdminUserInfo | null = null;
	userSearchLoading = false;
	userSearchError = '';
	savingUserGrants = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	setLoading = (value: boolean) => {
		this.loading = value;
	};

	setSuccessMessage = (value: string) => {
		this.successMessage = value;
	};

	setErrorMessage = (value: string) => {
		this.errorMessage = value;
	};

	clearMessages = () => {
		this.successMessage = '';
		this.errorMessage = '';
	};

	clearSelectedUser = () => {
		this.selectedUser = null;
		this.userSearchError = '';
	};

	fetchGrants = async () => {
		if (!this.rootStore.userStore.isAdmin) {
			this.setErrorMessage('Unauthorized: admin access required.');
			return;
		}
		this.setLoading(true);
		try {
			const list = await GrantService.getGrantsList();
			this.grants = list;
			this.setErrorMessage('');
		} catch {
			this.setErrorMessage('Failed to load grants.');
		} finally {
			this.setLoading(false);
		}
	};

	searchUserByEmail = async (email: string) => {
		if (!this.rootStore.userStore.isAdmin) {
			this.setErrorMessage('Unauthorized: admin access required.');
			return;
		}
		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			this.userSearchError = 'Email is required.';
			this.selectedUser = null;
			return;
		}

		this.userSearchLoading = true;
		this.userSearchError = '';
		try {
			const user = await GrantService.getUserByEmail(trimmedEmail);
			this.selectedUser = user;
		} catch (error) {
			this.selectedUser = null;
			if (error instanceof AxiosError && error.response?.status === 404) {
				this.userSearchError = 'User not found.';
			} else {
				this.userSearchError = 'Failed to load user.';
			}
		} finally {
			this.userSearchLoading = false;
		}
	};

	setUserGrants = async (email: string, grantNames: string[]) => {
		if (!this.rootStore.userStore.isAdmin) {
			this.setErrorMessage('Unauthorized: admin access required.');
			return false;
		}
		this.savingUserGrants = true;
		try {
			await GrantService.setUserGrants({ email, grants: grantNames });
			this.setSuccessMessage('User grants updated successfully.');
			this.setErrorMessage('');
			await this.searchUserByEmail(email);
			return true;
		} catch {
			this.setErrorMessage('Failed to update user grants.');
			return false;
		} finally {
			this.savingUserGrants = false;
		}
	};

	createGrant = async (data: CreateGrantPayload) => {
		if (!this.rootStore.userStore.isAdmin) {
			this.setErrorMessage('Unauthorized: admin access required.');
			return;
		}
		try {
			await GrantService.addGrant(data);
			this.setSuccessMessage('Grant created successfully.');
			this.setErrorMessage('');
			await this.fetchGrants();
		} catch {
			this.setErrorMessage('Failed to create grant.');
		}
	};
}
