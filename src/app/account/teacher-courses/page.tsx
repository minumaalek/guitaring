import { getSession } from "@/lib/check-auth";
import { redirect } from "next/navigation";
export default async function TeacherCourses() {
  const session = await getSession();
  if (!session?.user.isTeacher) redirect("/account");
  return <div>teacher courses here</div>;
}
