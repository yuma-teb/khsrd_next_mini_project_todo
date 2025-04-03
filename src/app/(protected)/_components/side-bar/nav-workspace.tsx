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
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/context/hook/useModal";
import { Button } from "@/components/ui/button";
interface Props {
	workSpaces: ResWorkSpace[];
}

export function NavFavorites({ workSpaces }: Readonly<Props>) {
	const { openModal } = useModal();
	const handleEdit = () => {
		openModal("confirm", {
			header: "Are you sure?",
			body: "You won't be able to undo this action.",
			cancel: "Cancel",
			accept: "Accept",
			onCancel: () => {
				console.log("Action canceled");
			},
			onAccept: () => {
				console.log("Action accepted");
			},
		});
	};
	const dropDownMenu: string[] = ["edit", ""];

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden max-h-1/3">
			<SidebarGroupLabel className="text-md text-black">
				Favorites
				<SquarePlus className="ml-auto" />
			</SidebarGroupLabel>
			<ScrollArea className="h-full w-full rounded-md">
				<SidebarMenu>
					{workSpaces.map((item) => (
						<DropdownMenu key={item.workspaceId}>
							<SidebarMenuItem>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
										{item.workspaceName}
										<MoreHorizontal className="ml-auto" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<Button onClick={handleEdit}>FGHJKL</Button>
								<DropdownMenuContent className="p-2 flex flex-col"></DropdownMenuContent>
							</SidebarMenuItem>
						</DropdownMenu>
					))}
				</SidebarMenu>
			</ScrollArea>
			<Toaster richColors />
		</SidebarGroup>
	);
}
