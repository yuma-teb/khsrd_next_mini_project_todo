import { fetchAPI } from "@/lib/api";
import { IUserBasicInfo } from "@/types/auth";

interface ResLogin {
	token: string;
}
const BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
export async function loginService(
	credentails: Omit<IUserBasicInfo, "username">
) {
	const res = await fetchAPI<ResLogin>(`${BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentails),
	});
	return res;
}

export async function registerService(credentails: IUserBasicInfo) {
	const res = await fetchAPI(`${BASE_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentails),
	});
	return res;
}
