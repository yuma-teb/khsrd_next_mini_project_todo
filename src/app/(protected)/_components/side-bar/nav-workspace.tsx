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
import { ReactNode } from "react";
interface Props {
	workSpaces: ResWorkSpace[];
}

interface DropDownProps {
	name: string;
	dialog: (
		workspaceId: string,
		name: string
	) => {
		title: string;
		description: ReactNode;
		confirmText?: string;
		cancelText?: string;
		onConfirm: () => void;
		onCancel?: () => void;
	};
}

export function NavFavorites({ workSpaces }: Readonly<Props>) {
	const dropDownMenu: string[] = ["edit"];

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
