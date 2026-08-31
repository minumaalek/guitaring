import { db } from "..";
import { auth } from "@/auth";
export async function getAllCourses() {
  return db.course.findMany({
    include: {
      teacher: true,
      category: {
        select: {
          slug: true,
        },
      },
    },
  });
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
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const enrollments = await db.courseEnrollment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: {
        include: {
          teacher: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return enrollments.map((enrollment) => enrollment.course);
}

export async function getTeacherCourses(teacherId) {
  return db.course.findMany({
    where: { teacherId: teacherId },
  });
}

export async function getCourseById(courseId) {
  return db.course.findUnique({
    where: {
      id: courseId,
    },
  });
}

export async function getCoursesByCategory(categoryName: string) {
  const category = await db.category.findFirst({
    where: {
      slug: categoryName,
    },
  });
  if (!category) {
    return [];
  }

  const courses = await db.course.findMany({
    where: {
      categoryId: category.id,
    },
    include: {
      teacher: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      category: true,
    },
  });

  return courses;
}
