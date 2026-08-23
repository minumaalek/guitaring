"use server";

import { auth } from "@/auth";
import { db } from "@/db";

export async function createComment(
  targetType: "ARTICLE" | "PRODUCT" | "COURSE",
  targetId: number,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const content = formData.get("content");

  if (typeof content !== "string" || !content.trim()) {
    return {
      success: false,
      message: "Comment cannot be empty.",
    };
  }

  const comment = await db.comment.create({
    data: {
      content: content.trim(),
      targetId,
      targetType,
      userId: session.user.id,
    },
  });

  return {
    success: true,
    comment,
  };
}
