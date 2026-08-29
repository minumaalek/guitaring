import { getSession } from "@/lib/check-auth";
import { getTeacherCourses } from "@/db/queries/courses";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Edit } from "lucide-react";
export default async function TeacherCourses() {
  const session = await getSession();
  const teacherCourses = await getTeacherCourses(session?.user.id);
  if (!session?.user.isTeacher) redirect("/account");
  return (
    <div>
      <h1>Your courses</h1>
      <ul>
        {teacherCourses.length
          ? teacherCourses.map((course) => {
              return (
                <li key={course.id}>
                  <div
                    className={`flex p-1 w-96 rounded-md ${course.published ? "bg-gray-50" : "bg-red-300"} items-center justify-between`}
                  >
                    <p>{course.title}</p>
                    {course.published ? (
                      <Link href={`/account/teacher-courses/${course.id}`}>
                        <Edit />
                      </Link>
                    ) : (
                      <div className="text-white bg-red-600 rounded-3xl p-2">
                        in review
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          : "no course yet"}
      </ul>
    </div>
  );
}
