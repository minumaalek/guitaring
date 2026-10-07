import UserSidebar from "@/components/account/user-sidebar";
import BurgerMenu from "@/components/menu/burger-menu";
import PanelSidebar from "@/components/panel/panel-sidebar";
import { getSession } from "@/lib/check-auth";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="">
      <div className="md:hidden flex justify-start items-center gap-2 bg-blue-500/70 backdrop-blur-sm p-2 w-full sticky top-0 z-50 border-b border-white/10 shadow-md shadow-black/10">
        <BurgerMenu>
          <PanelSidebar role={session?.user.isTeahcer ? "Teacher" : "User"} />
        </BurgerMenu>
      </div>
      <main className="flex-1 p-10 w-full ">{children}</main>
    </div>
  );
}
