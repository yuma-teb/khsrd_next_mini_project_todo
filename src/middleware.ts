import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/todo"];

const publicRoutes = ["/login", "/register"];

function isProtectedRoute(path: string): boolean {
	return protectedRoutes.some((route) => path.startsWith(route));
}

function isPublicRoute(path: string): boolean {
	return publicRoutes.includes(path);
}

export default async function middleware(request: NextRequest) {
	const session = await auth();
	const currentPath = request.nextUrl.pathname;

	if (session && isPublicRoute(currentPath)) {
		return NextResponse.redirect(new URL("/todo", request.url));
	}
	if (!session && isProtectedRoute(currentPath)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}
