import { fetchAPI } from "@/lib/api";
import { API_BASE_URL, WORKSPACE_ENDPOINT } from "@/lib/constants";
import { ResWorkSpace, ResWorkSpaceWithTask } from "@/types/workspace";

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
	try {
		let res = await fetchAPI<ResWorkSpace[]>(
			`${API_BASE_URL}/workspaces?${params.toString()}`
		);
		return res;
	} catch (e) {
		console.log("errorroro", e);
	}
}

export async function editWorkSpaceNameById(
	worksapceId: string,
	body: Pick<ResWorkSpace, "workspaceName">
) {
	try {
		const res = await fetchAPI<ResWorkSpace>(
			`${WORKSPACE_ENDPOINT}/${worksapceId}`,
			{
				method: "PUT",
				body: JSON.stringify(body),
			}
		);
		return res;
	} catch (e) {
		console.error(e);
	}
}

export async function updateWorkSpaceFavoriteById(
	worksapceId: string,
	body: Pick<ResWorkSpace, "isFavorite">
) {
	try {
		const res = await fetchAPI(
			`${WORKSPACE_ENDPOINT}/${worksapceId}/favorite`,
			{
				method: "PATCH",
				body: JSON.stringify(body),
			}
		);
		return res;
	} catch (e) {
		console.error(e);
	}
}

export async function getWorkSpaceById(workspaceId: string) {
	try {
		const res = await fetchAPI<ResWorkSpaceWithTask>(
			`${WORKSPACE_ENDPOINT}/${workspaceId}`
		);

		return res;
	} catch (e) {
		console.error(e);
	}
}

export async function createWorkSpace(
	body: Pick<ResWorkSpace, "workspaceName">
) {
	try {
		const res = await fetchAPI(`${WORKSPACE_ENDPOINT}`, {
			method: "POST",
			body: JSON.stringify({
				workspaceName: body.workspaceName,
			}),
		});
	} catch (e) {
		console.error(e);
	}
}
