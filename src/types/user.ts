export interface User extends UserBasicInfo {
	workspaceList: string[];
	roles: string;
}

export interface UserBasicInfo {
	userId: string;
	username: string;
	email: string;
	profile: string;
}
