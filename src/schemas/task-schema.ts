import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const taskSchema = z.object({
	taskTitle: z.string().min(1, "Task title is required"),
	taskDetails: z.string().min(1, "Task details are required"),
	tag: z.enum(["DESIGN", "DEVELOPMENT", "MARKETING", "TESTING"], {
		errorMap: () => ({ message: "Invalid tag" }),
	}),
	endDate: z.date().refine((date) => date > new Date(), {
		message: "End date must be in the future",
	}),
});

export const taskResolver = zodResolver(taskSchema);
