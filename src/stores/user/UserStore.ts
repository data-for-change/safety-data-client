import { makeAutoObservable } from "mobx";
import RootStore from "../RootStore";
import { saveToken, getValidToken, removeToken, decodeToken } from "../../utils/authUtils";
import AuthService from "../../services/AuthService";

export default class UserStore {
    user: { id: string; role: string; name?: string } | null = null;
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        // init app data
        this.rootStore = rootStore;
        makeAutoObservable(this);
        this.loadUser(); // Load from localStorage on init
    }
    
    async login(username: string, password: string): Promise<boolean> {
        try {
            const serv = new AuthService();
            const response = await serv.loginUser(username, password);
            const token = response.data.token;

            saveToken(token);
            this.updateUserFromToken(token);

            return true;
        } catch (err) {
            return false;
        }
    }

    logout() {
        removeToken();
        this.user = null;
    }

    updateUserFromToken(token: string) {
        const payload = decodeToken(token);
        if (payload) {
            this.user = { id: payload.id, role: payload.role };
        }
    }

    loadUser() {
        const token = getValidToken();
        if (token) {
            this.updateUserFromToken(token);
        } else {
            this.logout();
        }
    }

    get isAuthenticated() {
        return this.user !== null;
    }

    get isAdmin() {
        return this.user?.role === "admin";
    }

    get isEditor() {
        return this.user?.role === "editor";
    }

    get hasEditPermission() {
        return this.isAdmin || this.isEditor;
    }
}

