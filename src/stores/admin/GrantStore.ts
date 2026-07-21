import { makeAutoObservable } from 'mobx';
import GrantService from '../../services/GrantService';
import RootStore from '../RootStore';
import { Grant, CreateGrantPayload, UserGrantPayload } from '../../types/grant';

export default class GrantStore {
	rootStore: RootStore;
	grants: Grant[] = [];
	loading = false;
	successMessage = '';
	errorMessage = '';

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

	deleteGrant = async (grantName: string) => {
		if (!this.rootStore.userStore.isAdmin) {
			this.setErrorMessage('Unauthorized: admin access required.');
			return;
		}
		try {
			await GrantService.deleteGrant({ grant: grantName });
			this.setSuccessMessage('Grant deleted successfully.');
			this.setErrorMessage('');
			await this.fetchGrants();
		} catch {
			this.setErrorMessage('Failed to delete grant.');
		}
	};

	assignGrantToUser = async (data: UserGrantPayload) => {
		if (!this.rootStore.userStore.isAdmin) {
			this.setErrorMessage('Unauthorized: admin access required.');
			return;
		}
		try {
			await GrantService.addToGrant(data);
			this.setSuccessMessage('Grant assigned to user successfully.');
			this.setErrorMessage('');
		} catch {
			this.setErrorMessage('Failed to assign grant to user.');
		}
	};

	removeGrantFromUser = async (data: UserGrantPayload) => {
		if (!this.rootStore.userStore.isAdmin) {
			this.setErrorMessage('Unauthorized: admin access required.');
			return;
		}
		try {
			await GrantService.removeFromGrant(data);
			this.setSuccessMessage('Grant removed from user successfully.');
			this.setErrorMessage('');
		} catch {
			this.setErrorMessage('Failed to remove grant from user.');
		}
	};
}
