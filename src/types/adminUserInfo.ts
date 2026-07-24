export interface AdminUserInfo {
	id: number;
	email: string;
	first_name: string | null;
	last_name: string | null;
	grants: string[];
	roles: string[];
	is_active: boolean;
}
