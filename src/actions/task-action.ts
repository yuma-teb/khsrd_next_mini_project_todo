"use server";

import {
	createTaskService,
	udpateTaskByIdService,
	updateTaskStatusService,
} from "@/service/task-service";
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

export async function updateTaskStatusAction(
	workspaceId: string,
	taskId: string,
	body: Partial<Task>
) {
	try {
		const res = await updateTaskStatusService(workspaceId, taskId, body);
		revalidatePath("/(protected)/todo/[id]", "page");
		return res;
	} catch (e) {
		console.log(e);
	}
}

export async function updateTaskByIdAction(
	workspaceId: string,
	taskId: string,
	body: Partial<Task>
) {
	try {
		const res = await udpateTaskByIdService(workspaceId, taskId, body);
		revalidatePath("/(protected)/todo/[id]", "page");
		return res;
	} catch (e) {
		console.log(e);
	}
}
