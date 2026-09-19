import BurgerMenu from "../menu/burger-menu";
import SidebarItems from "./sidebar-items";
import { getSession } from "@/lib/check-auth";
export default async function UserSidebar() {
  const session = await getSession();
  return (
    <div className="">
      <div className="md:hidden">
        <BurgerMenu>
          <SidebarItems isTeacher={session?.user.isTeacher} />
        </BurgerMenu>
      </div>
      <div className="hidden md:flex w-full h-full main-gradient rounded-none shadow-2xl">
        <SidebarItems isTeacher={session?.user.isTeacher} />
      </div>
    </div>
  );
}
