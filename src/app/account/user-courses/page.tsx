import { getUserCourses } from "@/db/queries/courses";
import Link from "next/link";
import { getSession } from "@/lib/check-auth";
import { redirect } from "next/navigation";
import CourseCard from "@/components/courses/course-card";
export default async function UserCourses() {
  const session = await getSession();
  const userCourses = await getUserCourses(session?.user.id);
  if (!session?.user.isTeacher) return redirect("");
  return (
    <div>
      <h2>user courses here</h2>

      {userCourses.map((course, i) => {
        return (
          <CourseCard
            key={i}
            title={course.title}
            description={course.description}
            teacher={`${course.teacher.firstName} ${course.teacher.lastName}`}
            category={course.category.slug}
            slug={course.slug}
          />
        );
      })}
    </div>
  );
}
