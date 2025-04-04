import { User } from "next-auth";

interface Workspace {
	workspaceId: string;
	workspaceName: string;
	isFavorite: boolean;
	user: User;
	taskList: string[];
}

export interface Task {
	taskId: string;
	taskTitle: string;
	details: string;
	tag: "DESIGN" | "DEVELOPMENT" | "TESTING";
	status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
	startDate: string;
	endDate: string;
}

export interface ICreateTaskBody
	extends Omit<Task, "workspace" | "startDate" | "taskId" | "status"> {}
