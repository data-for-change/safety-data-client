import { makeAutoObservable, runInAction } from "mobx";
import RootStore from "../RootStore";
import AuthService from "../../services/AuthService";

export interface IUser {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    name?: string;
    role: string;
    roles?: string[];
}

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
            console.error("Auth check failed", err);
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
                    id: data.id,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    name: data.first_name ? `${data.first_name} ${data.last_name || ''}`.trim() : data.email,
                    role: data.roles?.[0] || 'authenticated',
                    roles: data.roles
                };
            });
        } catch (err) {
            console.error("Failed to fetch user info", err);
        }
    }

    /**
     * Documentation Flow: Initiates the redirect to the backend auth endpoint.
     * We use a popup window to handle the redirect cycle so the user doesn't leave the current page.
     */
    login() {
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        // Use the current origin as the redirect URL for the backend to send the user back to
        const redirectUrl = window.location.origin + "/public/close-popup.html";
        const authUrl = this.authService.getAuthorizeUrl(redirectUrl);

        const popup = window.open(
            authUrl,
            "googleLogin",
            `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=yes`
        );

        // Check if popup is closed and then refresh auth status
        const checkPopup = setInterval(() => {
            if (!popup || popup.closed) {
                clearInterval(checkPopup);
                this.checkAuthStatus();
            }
        }, 1000);
    }

    async logout() {
        try {
            await this.authService.logout();
            runInAction(() => {
                this.user = null;
            });
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    get isAuthenticated() {
        return this.user !== null;
    }

    get isAdmin() {
        return this.user?.roles?.includes("admins") || this.user?.role === "admin";
    }

    get isEditor() {
        return this.user?.roles?.includes("editor") || this.user?.role === "editor";
    }

    get hasEditPermission() {
        return this.isAdmin || this.isEditor;
    }
}
