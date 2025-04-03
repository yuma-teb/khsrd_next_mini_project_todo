"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { registerResolver, registerSchema } from "@/schemas/auth-schema";
import { IUserBasicInfo } from "@/types/auth";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { registerService } from "@/service/auth-service";

type RegisterSchema = z.infer<typeof registerSchema>;

interface IRegisterInfo extends IUserBasicInfo {}

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();
	const param = useSearchParams();

	useEffect(() => {
		if (param.get("error") === "oauth") {
			toast.error(
				<p className="text-xs text-red-500">
					Something went wrong cannot signin using google{" "}
				</p>
			);
			const timeout = setTimeout(() => {
				router.replace("/login");
			}, 2000);

			return () => clearTimeout(timeout);
		}
	}, []);

	const defaultValues = {
		username: "",
		email: "",
		password: "",
	} satisfies IRegisterInfo;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchema>({
		resolver: registerResolver,
		defaultValues,
	});

	const onGoogleSignIn = async () => {
		await signIn("google");
	};

	const onSubmit: SubmitHandler<IRegisterInfo> = async (data) => {
		const res = await registerService({
			email: data.email,
			password: data.password,
			username: data.username,
		});

		console.log("rss", res);

		if (res?.error) {
			toast.error(
				<p className="text-xs text-red-500">incorrect email or password </p>
			);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Toaster className="text-red-500" />
			<Card>
				<CardHeader className="text-3xl font-semibold text-center">
					Register
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="username">Username</Label>
								<Input
									{...register("username")}
									id="username"
									type="text"
									placeholder="username"
								/>
								{errors?.username && (
									<p className="text-xs text-red-500 mt-1">
										{" "}
										{errors?.username?.message}
									</p>
								)}
							</div>
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									{...register("email")}
									id="email"
									type="email"
									placeholder="email"
								/>
								{errors?.email && (
									<p className="text-xs text-red-500 mt-1">
										{" "}
										{errors?.email?.message}
									</p>
								)}
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									{...register("password")}
									id="password"
									type="password"
								/>
								{errors?.password && (
									<p className="text-xs text-red-500 mt-1">
										{errors?.password?.message}
									</p>
								)}
							</div>
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full hover:cursor-pointer">
									Register
								</Button>
								<Button
									type="button"
									variant="outline"
									className="w-full hover:cursor-pointer"
									onClick={onGoogleSignIn}
								>
									Login with Google
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<a
								onClick={() => router.replace("/login")}
								className="underline underline-offset-4"
							>
								Login
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
