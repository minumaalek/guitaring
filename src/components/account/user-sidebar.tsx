import BurgerMenu from "../menu/burger-menu";
// import SidebarItems from "./sidebar-items";
import { getSession } from "@/lib/check-auth";
export default async function UserSidebar() {
  const session = await getSession();
  return <div></div>;
}
