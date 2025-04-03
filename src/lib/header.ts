"use server";
import { auth } from "@/auth";

const headerToken = async () => {
	const session = await auth();

	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${session?.user?.token}`,
	};
};

export default headerToken;
