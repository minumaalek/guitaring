import { db } from "..";
export async function getAllCourses() {
  return db.course.findMany();
}
export async function getCourseBySlug(slug: string) {
  return db.course.findUnique({
    where: {
      slug,
    },
  });
}

export async function getPendingCourses(userId: string) {
  return db.courseEnrollment.findMany({
    where: {
      userId,
      status: "PENDING",
    },
    include: {
      course: true,
    },
  });
}

export async function getUserCourses(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      courses: true,
    },
  });
}
