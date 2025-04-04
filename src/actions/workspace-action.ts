"use server";
import * as workspaceService from "@/service/workspace-service";
import { ResWorkSpace } from "@/types/workspace";
import { revalidatePath } from "next/cache";

export async function getAllWorkSpace() {
	try {
		const res = await workspaceService.getAllWorkSpaceService();
		return res;
	} catch (e) {
		console.error(e);
	}
}

export async function getWorkSpaceById(worksapceId: string) {
	try {
		const res = await workspaceService.getWorkSpaceById(worksapceId);
		return res;
	} catch (e) {
		console.error(e);
	}
}
export async function updateWorkSpaceName(
	worksapceId: string,
	body: Pick<ResWorkSpace, "workspaceName">
) {
	try {
		const res = await workspaceService.editWorkSpaceNameById(worksapceId, body);
		revalidatePath("(protected)");
		return res;
	} catch (e) {
		console.error(e);
	}
}
export async function updateWorkSpaceFavorite(
	worksapceId: string,
	body: Pick<ResWorkSpace, "isFavorite">
) {
	try {
		const res = await workspaceService.updateWorkSpaceFavoriteById(
			worksapceId,
			body
		);
		return res;
	} catch (e) {
		console.error(e);
	}
}
export async function createNewWorkSpace(
	body: Pick<ResWorkSpace, "workspaceName">
) {
	try {
		const res = await workspaceService.createWorkSpace(body);
		return res;
	} catch (e) {
		console.error(e);
	}
}
