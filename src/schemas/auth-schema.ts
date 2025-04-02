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
