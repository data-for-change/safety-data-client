import axios, { AxiosError } from 'axios';
import { API_ANYWAY_URL } from '../utils/globalEnvs';
import { AdminUserInfo } from '../types/adminUserInfo';
import {
	Grant,
	CreateGrantPayload,
	SetUserGrantsPayload,
} from '../types/grant';

const apiUrl = API_ANYWAY_URL;
const withCredentials = { withCredentials: true };

class GrantService {
	static async getGrantsList(): Promise<Grant[]> {
		try {
			const response = await axios.get(`${apiUrl}/sd-user/get_grants_list`, withCredentials);
			return response.data;
		} catch (error) {
			GrantService.handleError('fetching grants list', error);
			throw error;
		}
	}

	static async getUserByEmail(email: string): Promise<AdminUserInfo> {
		try {
			const response = await axios.get(`${apiUrl}/sd-user/get_user_info_by_email`, {
				...withCredentials,
				params: { email },
			});
			return response.data;
		} catch (error) {
			GrantService.handleError('fetching user by email', error);
			throw error;
		}
	}

	static async addGrant(data: CreateGrantPayload): Promise<void> {
		try {
			await axios.post(`${apiUrl}/sd-user/add_grant`, data, withCredentials);
		} catch (error) {
			GrantService.handleError('adding grant', error);
			throw error;
		}
	}

	static async setUserGrants(data: SetUserGrantsPayload): Promise<void> {
		try {
			await axios.post(`${apiUrl}/sd-user/set_grants`, data, withCredentials);
		} catch (error) {
			GrantService.handleError('setting user grants', error);
			throw error;
		}
	}

	private static handleError(action: string, error: unknown): void {
		if (error instanceof AxiosError) {
			if (error.response?.status === 403) {
				console.error(`Unauthorized: You do not have permission while ${action}.`);
			} else {
				console.error(`Error ${action}:`, error.response?.data || error.message);
			}
		} else {
			console.error(`Unexpected error while ${action}:`, error);
		}
	}
}

export default GrantService;
