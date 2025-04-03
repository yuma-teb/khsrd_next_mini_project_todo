"use server";
import {
	deleteWorkSpaceService,
	getAllWorkSpaceService,
} from "@/service/workspace-service";
import { revalidatePath } from "next/cache";

export async function deleteWorkSpaceById(worksapceId: string) {
	try {
		await deleteWorkSpaceService(worksapceId);
		revalidatePath("/todo");
		return true;
	} catch (e) {
		console.error(e);
	}
}

export async function getAllWorkSpace() {
	try {
		const res = await getAllWorkSpaceService();
		return res;
	} catch (e) {
		console.error(e);
	}
}
