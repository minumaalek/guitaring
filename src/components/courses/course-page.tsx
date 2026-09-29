import { auth } from "@/auth";
import { db } from "@/db";
import { getCourseBySlug } from "@/db/queries/courses";
import CourseEnrollment from "./course-enrollment";
import {
  SquareUser,
  NotebookPen,
  Timer,
  ChartSpline,
  GraduationCap,
  ClockCheck,
  RotateCcwClock,
} from "lucide-react";

export default async function CoursePage({ slug }) {
  const courseItem = await getCourseBySlug(slug);
  const infoMap = [
    { key: 1, title: "Topic", icon: <NotebookPen /> },
    { key: 2, title: "Teacher", icon: <SquareUser /> },
    { key: 3, title: "Time", icon: <Timer /> },
    { key: 4, title: "Status", icon: <ChartSpline /> },
    { key: 5, title: "Students", icon: <GraduationCap /> },
    { key: 6, title: "Published", icon: <ClockCheck /> },
    { key: 7, title: "Updated", icon: <RotateCcwClock /> },
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
      <div className="relative md:grid md:grid-cols-[2fr_1fr] w-full h-full flex flex-col">
        <div className=" w-full h-full flex flex-col justify-start p-5">
          <div className="bg-blue-500 w-full h-80 rounded-2xl"></div>
          <h1>{courseItem.title}</h1>
        </div>
        <div className=" w-full h-full flex justify-center relative">
          <div className="h-full md:h-96 w-full md:w-2/3 p-6 card md:flex flex-col gap-2 sticky grid grid-cols-2">
            {infoMap.map((item) => {
              return (
                <div
                  key={item.key}
                  className={`flex gap-1 items-center h-20 md:h-5 flex-col md:flex-row iconic-card ${item.title == "Topic" && "col-span-2"}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              );
            })}
            <div className="flex flex-col items-center justify-center w-full  col-span-2 ">
              <div className="flex w-full items-center justify-center">
                <span className="bg-blue-600 text-white rounded w-10 h-6 text-center">
                  50%
                </span>
                <span className="old-price">{courseItem.originalPrice}</span>
                <span className="price text-3xl">{courseItem.newPrice}</span>
              </div>

              <CourseEnrollment
                courseId={courseItem.id}
                enrollmentStatus={enrollment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
