import { authConfig } from "@/auth";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

export default {} = NextAuth(authConfig);
