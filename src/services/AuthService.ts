import axios, { AxiosResponse } from 'axios';
import { API_ANYWAY_URL } from '../utils/globalEnvs';
import { IUserLoggedIn, IUser } from '../types/User';

class AuthService {
	apiUrl = API_ANYWAY_URL;

	// Safety Data session-based endpoints
	isLoggedIn = async (): Promise<AxiosResponse<IUserLoggedIn>> => {
		return axios.get(`${this.apiUrl}/sd-user/is_user_logged_in`, { withCredentials: true });
	};

	getUserInfo = async (): Promise<AxiosResponse<IUser>> => {
		return axios.get(`${this.apiUrl}/sd-user/info`, { withCredentials: true });
	};

	logout = async () => {
		return axios.get(`${this.apiUrl}/sd-user/logout`, { withCredentials: true });
	};

	/**
	 * Documentation Flow: Step 1: Initiate OAuth Login
	 * Redirect the user to the authorization endpoint:
	 * GET /sd-authorize/google
	 */
	getAuthorizeUrl = (redirectUrl?: string) => {
		const url = new URL(`www.anyway.co.il/sd-authorize/google`);
		if (redirectUrl) {
			url.searchParams.append('redirect_url', redirectUrl);
		}
		return url.toString();
	};
}

export default AuthService;
