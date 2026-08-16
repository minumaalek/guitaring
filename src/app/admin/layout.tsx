import Sidebar from "@/components/admin/sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <main className="flex-1 p-10 w-full">{children}</main>
    </div>
  );
}
