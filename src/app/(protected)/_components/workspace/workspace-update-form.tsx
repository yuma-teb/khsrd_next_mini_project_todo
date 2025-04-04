"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { workSpaceSchema, workSpaceResolver } from "@/schemas/workspace-schema";
import { ResWorkSpace } from "@/types/workspace";
import { Button } from "@/components/ui/button";

type workSpaceSchema = z.infer<typeof workSpaceSchema>;

interface Props {
	item?: ResWorkSpace;
	action: string;
	onAction: (data: Pick<ResWorkSpace, "workspaceName">) => void;
}
export function WorkSpaceUpdateForm({
	item,
	action,
	onAction,
}: Readonly<Props>) {
	const defaultValues = {
		workspaceName: item?.workspaceName ?? "",
	} satisfies Pick<ResWorkSpace, "workspaceName">;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<workSpaceSchema>({
		resolver: workSpaceResolver,
		defaultValues,
	});

	const onSubmit: SubmitHandler<Pick<ResWorkSpace, "workspaceName">> = async (
		data
	) => {
		await onAction(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4 py-4">
				<div className="flex flex-col items-start gap-4">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input
						{...register("workspaceName")}
						id="name"
						defaultValue="Pedro Duarte"
						className="col-span-3"
					/>
					{errors?.workspaceName && (
						<p className="text-xs text-red-500 mt-1">
							{errors?.workspaceName?.message}
						</p>
					)}
				</div>
			</div>
			<div className="flex justify-end w-full">
				<Button
					className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
					type="submit"
				>
					{action}
				</Button>
			</div>
		</form>
	);
}
