import AdminSidebar from "@/components/admin/admin-sidebar";
import PanelSideBar from "@/components/panel/panel-sidebar";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="h-screen flex">
      <PanelSideBar role={"Admin"} />
      <main className="flex-1 p-10 w-full">{children}</main>
    </div>
  );
}
