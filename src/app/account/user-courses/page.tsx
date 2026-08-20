import { getAllCourses, getUserCourses } from "@/db/queries/courses";
import Link from "next/link";

export default async function UserCourses() {
  const userCourses = await getAllCourses();
  return (
    <div>
      <h2>user courses here</h2>
      {userCourses.map((course) => {
        return <Link href={""}>{course.title}</Link>;
      })}
    </div>
  );
}
