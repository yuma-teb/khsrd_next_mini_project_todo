import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const workSpaceSchema = z.object({
	workspaceName: z.string().min(3, "invalid name must be at least 3"),
});
export const workSpaceResolver = zodResolver(workSpaceSchema);
