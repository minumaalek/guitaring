import { getAllCourses } from "@/db/queries/courses";
import Link from "next/link";
Link;
export default async function CoursesPage() {
  const courses = await getAllCourses();
  return (
    <div>
      {courses.map((course) => {
        return (
          <Link href={`/courses/music/${course.slug}`}>{course.title}</Link>
        );
      })}
    </div>
  );
}
