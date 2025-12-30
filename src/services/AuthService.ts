import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../utils/globalEnvs';
import { IUserLoggedIn, IUser } from '../types/User';

class AuthService {
	apiUrl = API_URL;

	// Safety Data session-based endpoints
	isLoggedIn = async (): Promise<AxiosResponse<IUserLoggedIn>> => {
		return axios.get(`${this.apiUrl}/sd-user/is_user_logged_in`, { withCredentials: true });
	};

	getUserInfo = async (): Promise<AxiosResponse<IUser>> => {
		return axios.get(`${this.apiUrl}/sd-user/info`, { withCredentials: true });
	};

	logout = async () => {
		return axios.get(`${this.apiUrl}/logout`, { withCredentials: true });
	};

	/**
	 * Documentation Flow: Step 1: Initiate OAuth Login
	 * Redirect the user to the authorization endpoint:
	 * GET /sd-authorize/google
	 */
	getAuthorizeUrl = (redirectUrl?: string) => {
		// redirect url to safety-data-client
		const url = new URL(`${this.apiUrl}/sd-authorize/google?redirect_url=${redirectUrl}`);
		return url.toString();
	};
}

export default AuthService;
