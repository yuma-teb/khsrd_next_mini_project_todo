"use client";
import { Toaster, toast } from "sonner";
import { MoreHorizontal, SquarePlus } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ResWorkSpace } from "@/types/workspace";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/context/hook/useModal";
import {
	createNewWorkSpace,
	updateWorkSpaceFavorite,
	updateWorkSpaceName,
} from "@/actions/workspace-action";
import { WorkSpaceUpdateForm } from "../workspace/workspace-update-form";
import { useRouter } from "next/navigation";

interface Props {
	workSpaces: ResWorkSpace[];
}

export function NavFavorites({ workSpaces }: Readonly<Props>) {
	const { openModal, closeModal } = useModal();
	const { push } = useRouter();

	const onEditAction = async (
		workspaceId: string,
		body: Pick<ResWorkSpace, "workspaceName">
	) => {
		const res = await updateWorkSpaceName(workspaceId, body);
		closeModal();
		toast.success("Update successfully!");
	};

	const onCreateAction = async (body: Pick<ResWorkSpace, "workspaceName">) => {
		const res = await createNewWorkSpace(body);
		console.log(res);
	};

	const handleEdit = (data: ResWorkSpace) => {
		openModal("confirm", {
			header: "Edit Workspace",
			body: (
				<WorkSpaceUpdateForm
					action="Edit"
					item={data}
					onAction={(body) => onEditAction(data.workspaceId, body)}
				/>
			),
		});
	};

	const handleCreate = () => {
		openModal("confirm", {
			header: "Create Workspace",
			body: (
				<WorkSpaceUpdateForm
					action="Save"
					onAction={(body) => onCreateAction(body)}
				/>
			),
		});
	};

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden max-h-1/3">
			<SidebarGroupLabel className="text-md text-black">
				Favorites
				<SquarePlus className="ml-auto" onClick={handleCreate} />
			</SidebarGroupLabel>
			<ScrollArea className="h-full w-full rounded-md">
				<SidebarMenu>
					{workSpaces?.map((item) => (
						<DropdownMenu key={item.workspaceId}>
							<SidebarMenuItem>
								<SidebarMenuButton
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									onClick={() => push(`/todo/${item.workspaceId}?q=workspace`)}
								>
									{item.workspaceName}
									<DropdownMenuTrigger asChild>
										<MoreHorizontal className="ml-auto" />
									</DropdownMenuTrigger>
								</SidebarMenuButton>
								<DropdownMenuContent className="p-2 flex flex-col">
									<DropdownMenuItem onClick={() => handleEdit(item)}>
										Edit
									</DropdownMenuItem>
								</DropdownMenuContent>
							</SidebarMenuItem>
						</DropdownMenu>
					))}
				</SidebarMenu>
			</ScrollArea>
		</SidebarGroup>
	);
}
