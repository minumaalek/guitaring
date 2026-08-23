"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

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

export async function createCourse(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user?.isTeacher) {
      return {
        success: false,
        message: "You are not authorized to create a course.",
      };
    }

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const slug = formData.get("slug")?.toString();
    const content = formData.get("content")?.toString();

    const originalPrice = Number(formData.get("originalPrice"));
    const newPrice = Number(formData.get("newPrice"));
    const categoryId = Number(formData.get("categoryId"));

    if (!title || !description || !slug || !content) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const existingCourse = await db.course.findUnique({
      where: {
        slug,
      },
    });

    if (existingCourse) {
      return {
        success: false,
        message: "A course with this slug already exists.",
      };
    }

    const course = await db.course.create({
      data: {
        title,
        description,
        slug,
        content,
        originalPrice,
        newPrice,
        categoryId,
        teacherId: session.user.id,
      },
    });

    revalidatePath("/account/courses");

    return {
      success: true,
      message: "Course created successfully.",
      course,
    };
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while creating the course.",
    };
  }
}
