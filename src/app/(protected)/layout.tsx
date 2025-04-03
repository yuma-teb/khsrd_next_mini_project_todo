import { AppSidebar } from "./_components/side-bar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./_components/side-bar/side-header";
import { ResWorkSpace } from "@/types/workspace";
import { getAllWorkSpace } from "../actions/workspace-action";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const workSpaces = (await getAllWorkSpace()) as APIResponse<ResWorkSpace[]>;
	return (
		<SidebarProvider>
			<AppSidebar workSpaces={workSpaces?.payload} variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							{children}
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
