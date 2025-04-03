import React, { ReactNode } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
	trigger: ReactNode;
	title: string;
	description: ReactNode;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel?: () => void;
}

export function ConfirmDialog({
	trigger,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary" onClick={onCancel}>
							{cancelText}
						</Button>
					</DialogClose>

					<Button
						type="button"
						variant="destructive"
						onClick={() => {
							onConfirm();
						}}
					>
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
