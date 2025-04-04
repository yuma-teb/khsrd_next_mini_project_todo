import { fetchAPI } from "@/lib/api";
import { USER_ENDPOINT } from "@/lib/constants";
import { UserBasicInfo } from "@/types/user";

export async function getMe() {
	try {
		const res = await fetchAPI<UserBasicInfo>(`${USER_ENDPOINT}`);
		return res;
	} catch (e) {
		console.log("Get user error", e);
	}
}
