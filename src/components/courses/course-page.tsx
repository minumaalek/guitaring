import { auth } from "@/auth";
import { db } from "@/db";
import { getCourseBySlug } from "@/db/queries/courses";
import CourseAction from "./course-purchase";

export default async function CoursePage({ slug }) {
  const courseItem = await getCourseBySlug(slug);

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
    <div>
      <h2>{courseItem.title}</h2>

      <CourseAction
        courseId={courseItem.id}
        enrollmentStatus={enrollment?.status ?? null}
      />
    </div>
  );
}
