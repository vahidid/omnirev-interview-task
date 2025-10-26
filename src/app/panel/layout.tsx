import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { ACCESS_TOKEN_KEY } from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function PanelLayout(props: PropsWithChildren) {
	const { children } = props;

	const c = await cookies();

	if (!c.has(ACCESS_TOKEN_KEY)) {
		return redirect("/login");
	}
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				<main className="gap-4 p-4">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
