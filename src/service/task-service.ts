import { fetchAPI } from "@/lib/api";
import { TAWSK_ENDPOINT } from "@/lib/constants";

export async function getAllTasksService(worksapceId: string) {
	try {
		const res = await fetchAPI(
			`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/tasks/workspace/${worksapceId}`
		);

		return res;
	} catch (e) {
		console.error(e);
	}
}

export async function getTaskByIdService(workspaceId: string, taskId: string) {
	try {
		const res = await fetchAPI(
			`${TAWSK_ENDPOINT}/${taskId}/workspace/${workspaceId}`
		);
		return res;
	} catch (e) {
		console.error(e);
	}
}

export async function udpateTaskByIdService(
	workspaceId: string,
	taskId: string,
	body: any
) {
	try {
		const res = await fetchAPI(
			`${TAWSK_ENDPOINT}/${taskId}/workspace/${workspaceId}`,
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

export async function deleteTaskByIdService(
	workspaceId: string,
	taskId: string
) {
	try {
		const res = await fetchAPI(
			`${TAWSK_ENDPOINT}/${taskId}/workspace/${workspaceId}`,
			{
				method: "DELETE",
			}
		);
		return res;
	} catch (e) {
		console.error(e);
	}
}

export async function createTaskService(workspaceId: string, body: any) {
	try {
		const res = await fetchAPI(`${TAWSK_ENDPOINT}/workspace/${workspaceId}`, {
			method: "POST",
			body: JSON.stringify(body),
		});
		return res;
	} catch (e) {
		console.error(e);
	}
}
