"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/hook/useModal";
import { Plus } from "lucide-react";
import { WorkSpaceUpdateForm } from "../workspace/workspace-update-form";
import { Task } from "@/types/task";
import { createTaskAction } from "@/actions/task-action";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { CreateTaskForm } from "./create-form";

export default function AddTaskButton() {
	const params = useParams();
	const { openModal, closeModal } = useModal();

	const createTask = async (data: Partial<Task>) => {
		await createTaskAction(params.id as string, data);
		toast.success("created successfully!");
		closeModal();
	};
	const handleCreate = () => {
		openModal("confirm", {
			header: "Create New Task",
			body: (
				<CreateTaskForm
					action="Save Task"
					onAction={(data: any) => createTask(data)}
				/>
			),
		});
	};
	return (
		<>
			<Button
				className="bg-blue-500 hover:bg-blue-600 absolute bottom-5 right-10 "
				onClick={handleCreate}
			>
				<Plus /> <p className="font-bold">New Task</p>
			</Button>
		</>
	);
}
