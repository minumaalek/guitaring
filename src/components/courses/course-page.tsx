import { auth } from "@/auth";
import { db } from "@/db";
import { getCourseBySlug } from "@/db/queries/courses";
import CourseEnrollment from "./course-purchase";
import { SquareUser, NotebookPen, Timer } from "lucide-react";

export default async function CoursePage({ slug }) {
  const courseItem = await getCourseBySlug(slug);
  const infoMap = [
    { key: 1, title: "Topic", icon: <NotebookPen /> },
    { key: 2, title: "Teacher", icon: <SquareUser /> },
    { key: 3, title: "Time", icon: <Timer /> },
  ];

  if (!courseItem) {
    return <div>Course not found</div>;
  }

  const session = await auth();

  const enrollment = session?.user?.id
    ? await db.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: courseItem.id,
          },
        },
        select: {
          status: true,
        },
      })
    : null;

  return (
    <div className="w-full h-full">
      <div className="relative grid grid-cols-[2fr_1fr] w-full h-full">
        <div className=" w-full h-full flex flex-col justify-start p-5">
          <div className="bg-blue-500 w-full h-80 rounded-2xl"></div>
          <h1>{courseItem.title}</h1>
        </div>
        <div className=" w-full h-full">
          <div className="h-96 w-full p-6 card flex flex-col gap-2">
            {infoMap.map((item) => {
              return (
                <div key={item.key} className="flex gap-1 items-center h-5 ">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
