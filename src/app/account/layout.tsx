import UserSidebar from "@/components/account/user-sidebar";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      <UserSidebar />
      <main className="flex-1 p-10 w-full">{children}</main>
    </div>
  );
}
