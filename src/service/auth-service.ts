"use server";
import { AUTH_ENDPOINT } from "@/lib/constants";
import { IUserBasicInfo } from "@/types/auth";

export async function loginService(
	credentails: Omit<IUserBasicInfo, "username">
) {
	const res = await fetch(`${AUTH_ENDPOINT}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentails),
	});
	return await res.json();
}

export async function registerService(credentails: IUserBasicInfo) {
	const res = await fetch(`${AUTH_ENDPOINT}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentails),
	});
	return await res.json();
}
