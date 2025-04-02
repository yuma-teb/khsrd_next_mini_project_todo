import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// login schema
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "please input email" })
		.email({ message: "invalid email" }),
	password: z.string().min(6, "password must be at least 8 characters"),
});
export const loginResolver = zodResolver(loginSchema);

export const registerSchema = z.object({
	username: z.string().min(3, "valid name must be at least 3"),
	email: z
		.string()
		.min(1, { message: "please input email" })
		.email({ message: "invalid email" }),
	password: z.string().min(6, "password must be at least 8 characters"),
});
export const registerResolver = zodResolver(registerSchema);
