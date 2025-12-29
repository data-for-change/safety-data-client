export interface IUserLoggedIn {
	is_user_logged_in: boolean;
}

export interface IUser {
	app: number;
	email: string;
	first_name: string | null;
	grants: string[];
	id: number;
	is_active: boolean;
	is_user_completed_registration: null;
	last_name: string | null;
	oauth_provider: 'google';
	oauth_provider_user_name: string | null;
	oauth_provider_user_picture_url: string | null;
	organizations: [];
	phone: string | null;
	roles: string[];
	user_desc: string | null;
	user_register_date: string;
	user_type: string | null;
	user_url: string | null;
	full_name: string | null;
	role: string | null;
}
