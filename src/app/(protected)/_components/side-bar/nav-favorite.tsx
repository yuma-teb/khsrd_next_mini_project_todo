"use client";

import { MoreHorizontal, SquarePlus } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { ResWorkSpace } from "@/types/workspace";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

interface Props {
	workSpaces: ResWorkSpace[];
}

const dropDownMenu: string[] = ["edit", "delete"];

export function NavFavorites({ workSpaces }: Readonly<Props>) {
	const { isMobile } = useSidebar();

	const handleDelete = (id: any) => {
		// delelete
	};

	const handleEdit = (id: any) => {
		// delelete
	};

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden max-h-1/3">
			<SidebarGroupLabel className="text-md text-black">
				Favorites
				<SquarePlus className="ml-auto" />
			</SidebarGroupLabel>
			<ScrollArea className="h-full w-full rounded-md ">
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
								<DropdownMenuContent className="p-2 flex flex-col ">
									{dropDownMenu?.map((d) => (
										<DropdownMenuItem
											className="hover:bg-neutral-400 p-2 rounded-md"
											key={d}
										>
											{d}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</SidebarMenuItem>
						</DropdownMenu>
					))}
				</SidebarMenu>
			</ScrollArea>
		</SidebarGroup>
	);
}
