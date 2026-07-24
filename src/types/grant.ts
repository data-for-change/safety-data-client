export interface Grant {
	id: number;
	name: string;
	description: string;
}

export interface CreateGrantPayload {
	name: string;
	description: string;
}

export interface UserGrantPayload {
	email: string;
	grant: string;
}

export interface SetUserGrantsPayload {
	email: string;
	grants: string[];
}
