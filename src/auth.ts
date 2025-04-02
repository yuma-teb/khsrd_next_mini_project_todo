import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginService } from "./service/auth-service";

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			token: string;
		};
	}
	interface JWT {
		token: string;
	}
}

const authConfig = {
	providers: [
		CredentialProvider({
			name: "credentails",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const user: APIResponse<{
					token: string;
				}> = await loginService(credentials as any);

				if (user?.status === "INTERNAL_SERVER_ERROR") {
					throw new Error("incorrect email or password");
					return null;
				}

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user?.payload as any;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log(
				"google oathhtthth",
				user,
				account,
				profile,
				email,
				credentials
			);
			return true;
		},
		async session({ session, user, token }) {
			console.log("token");
			if (token?.token) {
				session.user.token = "asfdasdfasd";
			}
			return session;
		},
		async jwt({ token, user, account, profile }) {
			if (user) {
				token.token = (user as User & { token: string }).token;
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
			},
		},
	},
	pages: {
		signIn: "/login",
	},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
