import {
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
	header?: ReactNode;
	body?: ReactNode;
	cancel?: string;
	onCacel?: any;
	accept?: string;
	onAccept?: any;
}
export default function ConfirmDialog({
	header,
	body,
	cancel,
	onCacel,
	accept,
	onAccept,
}: Readonly<Props>) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{header}</DialogTitle>
			</DialogHeader>
			{body}
			<DialogFooter>
				{cancel && <Button onClick={onCacel}>{cancel}</Button>}
				{accept && <Button onClick={onAccept}>{accept}</Button>}
			</DialogFooter>
		</DialogContent>
	);
}
