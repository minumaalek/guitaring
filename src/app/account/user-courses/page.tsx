import { getAllCourses, getUserCourses } from "@/db/queries/courses";
import Link from "next/link";
import { getSession } from "@/lib/check-auth";
import { redirect } from "next/navigation";
export default async function UserCourses() {
  const userCourses = await getAllCourses();
  if (!session?.user.isTeacher) return redirect("");
  return (
    <div>
      <h2>user courses here</h2>
      {userCourses.map((course) => {
        return <Link href={""}>{course.title}</Link>;
      })}
    </div>
  );
}
