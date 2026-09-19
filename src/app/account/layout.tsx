import UserSidebar from "@/components/account/user-sidebar";
import PanelSidebar from "@/components/panel/panel-sidebar";
import { getSession } from "@/lib/check-auth";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="h-screen flex">
      <PanelSidebar role={session?.user.isTeahcer ? "Teacher" : "User"} />
      <main className="flex-1 p-10 w-full">{children}</main>
    </div>
  );
}
