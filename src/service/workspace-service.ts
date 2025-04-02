import { WORKSPACE_ENDPOINT } from "@/lib/constants";
import headerToken from "@/lib/header";

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
	const headers = await headerToken();

	const params = new URLSearchParams({
		pageNo: String(pageNo),
		pageSize: String(pageSize),
		sortBy,
		sortDirection,
	});

	const res = await fetch(`${WORKSPACE_ENDPOINT}?${params.toString()}`, {
		headers,
	});
}
