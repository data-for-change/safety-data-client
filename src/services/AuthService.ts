import axios from 'axios';
import { API_URL } from '../utils/globalEnvs';

class AuthService {
    apiUrl = `${API_URL}/api/v1/auth` ;
    registerUser = async (username: string, password: string) => {
        return axios.post(`${this.apiUrl}/register`, { username, password });
    };
    
    loginUser = async (username: string, password: string) => {
        return axios.post(`${this.apiUrl}/login`, { username, password });
    };

    getProfile = async (token: string) => {
        return axios.get(`${API_URL}/api/v1/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    };
}

export default AuthService;