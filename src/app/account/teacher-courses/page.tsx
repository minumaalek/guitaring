import { getSession } from "@/lib/check-auth";
import { getTeacherCourses } from "@/db/queries/courses";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Edit, Plus } from "lucide-react";
export default async function TeacherCourses() {
  const session = await getSession();
  const teacherCourses = await getTeacherCourses(session?.user.id);
  if (!session?.user.isTeacher) redirect("/account");
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1>Your courses</h1>
        <Link href="/account/teacher-courses/new">
          <button className="main-gradient w-24 flex items-center justify-center ">
            <Plus className="size-5" />
            new
          </button>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="grid grid-cols-4 place-items-center main-gradient rounded-sm w-full">
          <p className="place-self-start">Title</p>
          <p>Created at</p>
          <p>Status</p>
          <p>actions</p>
        </div>
        <ul className="flex flex-col w-full gap-2">
          {teacherCourses.length
            ? teacherCourses.map((course) => {
                return (
                  <li key={course.id} className="w-full">
                    <div
                      className={`grid grid-cols-4 place-items-center p-1 rounded-md ${course.published ? "bg-gray-50" : "bg-red-300"} items-center justify-between`}
                    >
                      <p className="place-self-start">{course.title}</p>
                      <p>
                        {course.createdAt &&
                          course.createdAt.toLocaleDateString()}
                      </p>{" "}
                      {course.published ? (
                        <div className="text-white bg-green-600 rounded-3xl p-1">
                          published
                        </div>
                      ) : (
                        <div className="text-white bg-red-600 rounded-3xl p-1">
                          in review
                        </div>
                      )}
                      <Link href={`/account/teacher-courses/${course.id}`}>
                        <Edit />
                      </Link>
                    </div>
                  </li>
                );
              })
            : "no course yet"}
        </ul>
      </div>
    </div>
  );
}
