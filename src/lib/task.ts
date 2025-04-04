import { Task } from "@/types/task";

export const groupTasksByStatus = (tasks: Task[]) => {
	const statuses = Array.from(new Set(tasks.map((task) => task.status))); // Get unique statuses

	return statuses.reduce((acc: Record<string, Task[]>, status) => {
		acc[status] = tasks.filter((task) => task.status === status);
		return acc;
	}, {});
};
