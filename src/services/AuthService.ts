import axios from 'axios';
import { API_URL2 } from '../utils/globalEnvs';

class AuthService {
    apiUrl = API_URL2;

    // Safety Data session-based endpoints
    isLoggedIn = async () => {
        return axios.get(`${this.apiUrl}/sd-user/is_user_logged_in`, { withCredentials: true });
    };

    getUserInfo = async () => {
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
        const url = new URL(`${this.apiUrl}/sd-authorize/google`);
        if (redirectUrl) {
            url.searchParams.append('redirect_url', redirectUrl);
        }
        return url.toString();
    };
}

export default AuthService;