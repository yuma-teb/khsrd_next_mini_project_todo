import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/todo"];

function isProtectedRoute(path: string): boolean {
	return protectedRoutes.some((route) => path.startsWith(route));
}

export default async function middleware(request: NextRequest) {
	const session = await auth();

	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/todo/:path*"],
};
