"use server";

import { createTaskService } from "@/service/task-service";
import { Task } from "@/types/task";
import { revalidatePath } from "next/cache";

export async function createTaskAction(
	workspaceId: string,
	body: Partial<Task>
) {
	try {
		const res = await createTaskService(workspaceId, body);
		revalidatePath("/(protected)/todo");
		return res;
	} catch (e) {
		console.log(e);
	}
}
