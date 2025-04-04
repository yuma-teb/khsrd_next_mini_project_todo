import { AppSidebar } from "./_components/side-bar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "./_components/side-bar/side-header";
import { ResWorkSpace } from "@/types/workspace";
import { getAllWorkSpace } from "@/actions/workspace-action";
import { ModalProvider } from "@/context/modal-provider";
import { BaseDialog } from "./_components/modal/base-dialog";
import { Toaster } from "@/components/ui/sonner";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const workSpaces = (await getAllWorkSpace()) as APIResponse<ResWorkSpace[]>;
	return (
		<ModalProvider>
			<SidebarProvider>
				<AppSidebar workSpaces={workSpaces?.payload} variant="inset" />
				<SidebarInset>
					<SiteHeader />
					<div className="flex flex-1 flex-col">
						<div className="@container/main flex flex-1 flex-col gap-2">
							<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
								{children}
								<BaseDialog />
								<Toaster richColors />
							</div>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</ModalProvider>
	);
}
