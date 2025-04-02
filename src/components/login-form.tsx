"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginResolver, loginSchema } from "@/schemas/auth-schema";

type LoginSchema = z.infer<typeof loginSchema>;

interface ILoginInput {
	email: string;
	password: string;
}

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const defaultValues = {
		email: "",
		password: "",
	};

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: loginResolver,
	});

	const onSubmit: SubmitHandler<ILoginInput> = (data) => {
		console.log("datat", data);
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-3xl font-semibold text-center">
					Login
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-6">
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
									<a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
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
									Login
								</Button>
								<Button
									variant="outline"
									className="w-full hover:cursor-pointer"
								>
									Login with Google
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<a href="#" className="underline underline-offset-4">
								Sign up
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
