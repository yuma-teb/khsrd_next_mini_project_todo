import { Task } from "./task";

export interface ResWorkSpace {
	workspaceId: string;
	workspaceName: string;
	isFavorite: boolean;
}

export interface ResWorkSpaceWithTask extends ResWorkSpace {
	taskList: Task[];
}
