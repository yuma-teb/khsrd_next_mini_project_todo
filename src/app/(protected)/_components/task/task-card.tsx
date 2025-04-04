"use client";

import {
	updateTaskByIdAction,
	updateTaskStatusAction,
} from "@/actions/task-action";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/context/hook/useModal";
import {
	udpateTaskByIdService,
	updateTaskStatusService,
} from "@/service/task-service";
import { Task } from "@/types/task";
import { Clock, Ellipsis, MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { CreateTaskForm } from "./create-form";
import { toast } from "sonner";

interface Props {
	task: Task;
}

export default function TaskCard({ task }: Readonly<Props>) {
	const { id } = useParams();
	const [status, setStatus] = useState(task.status);
	const { openModal } = useModal();

	const updateTaskStatus = async (newStatus: any) => {
		setStatus(newStatus);
		await updateTaskStatusAction(id as string, task.taskId, {
			status: newStatus,
		});
	};

	const onEditTask = async (task: Task) => {
		await updateTaskByIdAction(id as string, task?.taskId, task);
		toast.error("update task by id");
	};

	const handleEditTask = () => {
		openModal("confirm", {
			header: "Edit Task",
			body: (
				<CreateTaskForm task={task} action="edit task" onAction={onEditTask} />
			),
		});
	};

	const statusColors: Record<string, string> = {
		NOT_STARTED: "bg-red-400",
		IN_PROGRESS: "bg-yellow-400",
		FINISHED: "bg-green-400",
	};

	return (
		<div className="border border-gray-300 rounded-xl mt-8">
			<div className="p-5">
				<div className="flex justify-between">
					<h2 className="text-xl font-bold capitalize">{task.taskTitle}</h2>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Ellipsis className="ml-auto" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="p-2 flex flex-col">
							<DropdownMenuItem onClick={() => handleEdit(item)}>
								Edit
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<p className="line-clamp-2 text-light-steel-blue my-2 h-12">
					{task.details}
				</p>

				<div className="flex justify-between items-center mt-4">
					<p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
						{task.tag}
					</p>

					{/* Status Indicator */}
					<div className={`rounded-full w-8 h-8 ${statusColors[status]}`} />
				</div>
			</div>

			<div className="flex justify-between items-center border-t border-t-gray-300 p-5">
				<Select value={status} onValueChange={updateTaskStatus}>
					<SelectTrigger className="w-36 truncate border-watermelon-red text-watermelon-red">
						<SelectValue placeholder={status} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
						<SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
						<SelectItem value="FINISHED">FINISHED</SelectItem>
					</SelectContent>
				</Select>

				{/* Date */}
				<p className="flex gap-3 text-light-steel-blue">
					<Clock size={22} /> Mar 23, 2025
				</p>
			</div>
		</div>
	);
}
