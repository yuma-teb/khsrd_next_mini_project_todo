import { fetchAPI } from "@/lib/api";
import { WORKSPACE_ENDPOINT } from "@/lib/constants";
import { ResWorkSpace } from "@/types/workspace";

interface QueryParams {
	pageName: number;
	pageSize: number;
	sortBy: "workspaceId" | "workspaceName";
	sortDirection: "ASC" | "DESC";
}
export async function getAllWorkSpaceService({
	pageNo = 0,
	pageSize = 10,
	sortBy = "workspaceId",
	sortDirection = "ASC",
} = {}) {
	const params = new URLSearchParams({
		pageNo: String(pageNo),
		pageSize: String(pageSize),
		sortBy,
		sortDirection,
	});
	let res = null;
	try {
		res = await fetchAPI<ResWorkSpace[]>(
			`${WORKSPACE_ENDPOINT}?${params.toString()}`
		);
		console.log("erresss", res);
		return res;
	} catch (e) {
		console.log("errorroro", e);
	}
}

export async function deleteWorkSpaceService(worksapceId: string) {
	try {
		await fetchAPI(`${WORKSPACE_ENDPOINT}/${worksapceId}`, {
			method: "DELETE",
		});
	} catch (e) {
		console.error(e);
	}
}
