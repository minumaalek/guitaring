import UserSidebarItems from "./sidebar-items";
import { getSession } from "@/lib/check-auth";
export default async function UserSidebar() {
  const session = await getSession();
  return <UserSidebarItems isTeacher={session?.user.isTeacher} />;
}
