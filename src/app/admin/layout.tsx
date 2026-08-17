import AdminSidebar from "@/components/admin/admin-sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-10 w-full">{children}</main>
    </div>
  );
}
