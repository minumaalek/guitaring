"use server";

import { auth } from "@/auth";
import { db } from "@/db";

export async function enrollInCourse(courseId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      courses: {
        connect: {
          id: courseId,
        },
      },
    },
  });

  return {
    success: true,
  };
}

export async function addCourseToCheckout(courseId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  await db.courseEnrollment.upsert({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId,
      },
    },
    create: {
      userId: session.user.id,
      courseId,
      status: "PENDING",
    },
    update: {
      status: "PENDING",
    },
  });

  return {
    success: true,
  };
}
