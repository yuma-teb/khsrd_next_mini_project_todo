"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { taskSchema } from "@/schemas/task-schema";
import { Task } from "@/types/task";

type createTaskSchema = z.infer<typeof taskSchema>;

interface Props {
	task: Task;
	action: string;
	onAction: (data: Partial<Task>) => void;
}

export function CreateTaskForm({ task, action, onAction }: Readonly<Props>) {
	const defaultValues = {
		taskTitle: task?.taskTitle || "",
		taskDetails: task?.details || "",
		tag: task?.tag || "DESIGN",
		endDate: task?.endDate ?? new Date("2025-04-04T02:49:21.394Z"),
	} as any;

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<createTaskSchema>({
		resolver: zodResolver(taskSchema),
		defaultValues,
	});

	const onSubmit: SubmitHandler<any> = async (data) => {
		const formattedData = {
			...data,
			endDate: data.endDate.toISOString(),
		};
		console.log("fghjkl;", formattedData);
		await onAction(formattedData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			{/* Task Title */}
			<div className="flex flex-col items-start gap-4">
				<Label htmlFor="taskTitle">Title</Label>
				<Input
					{...register("taskTitle")}
					id="taskTitle"
					placeholder="Task title"
					className="w-full" // Full width
				/>
				{errors.taskTitle && (
					<p className="text-xs text-red-500 mt-1">
						{errors.taskTitle.message}
					</p>
				)}
			</div>

			{/* Tag Selector */}
			<div className="flex flex-col items-start gap-4">
				<Label htmlFor="tag">Tag</Label>
				<Select {...register("tag")}>
					<SelectTrigger className="w-full">
						{" "}
						{/* Full width */}
						<SelectValue placeholder="Select a tag" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="DESIGN">Design</SelectItem>
						<SelectItem value="DEVELOPMENT">Development</SelectItem>
						<SelectItem value="MARKETING">Marketing</SelectItem>
						<SelectItem value="TESTING">Testing</SelectItem>
					</SelectContent>
				</Select>
				{errors.tag && (
					<p className="text-xs text-red-500 mt-1">{errors.tag.message}</p>
				)}
			</div>

			{/* Date Picker */}
			<div className="flex flex-col items-start gap-4">
				<Label htmlFor="endDate">End Date</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className="w-full justify-start text-left font-normal" // Full width
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{watch("endDate") ? (
								format(watch("endDate"), "PPP")
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={watch("endDate")}
							onSelect={(date) => setValue("endDate", date!)}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
				{errors.endDate && (
					<p className="text-xs text-red-500 mt-1">{errors.endDate.message}</p>
				)}
			</div>

			{/* Task Details */}
			<div className="flex flex-col items-start gap-4">
				<Label htmlFor="taskDetails">Details</Label>
				<Input
					{...register("taskDetails")}
					id="taskDetails"
					placeholder="Task details"
					className="w-full" // Full width
				/>
				{errors.taskDetails && (
					<p className="text-xs text-red-500 mt-1">
						{errors.taskDetails.message}
					</p>
				)}
			</div>

			<Button type="submit" className="w-full">
				{action}
			</Button>
		</form>
	);
}
