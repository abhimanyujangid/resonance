import { cookies } from "next/headers";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { DashboardSidebar } from "@/src/feature/dashboard/components/dashboard-sidebar";
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
