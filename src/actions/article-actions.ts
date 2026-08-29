"use server";

import { db } from "@/db";
import { articleSchema } from "@/lib/validations/article-validation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function createArticle(formData: FormData) {
  const admin = await requireAdmin();
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    adminId: admin.id,
  };

  const result = articleSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const article = await db.article.create({
      data: result.data,
    });

    return {
      success: true,
      article,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      errors: {
        general: ["Failed to create article"],
      },
    };
  }
}

export async function editArticle(articleId: number, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    content: formData.get("content"),
  };

  const result = articleSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const article = await db.article.update({
    where: {
      id: articleId,
    },
    data: result.data,
  });

  return {
    success: true,
    article,
  };
}

export async function deleteArticle(articleId: number) {
  try {
    await db.article.delete({
      where: {
        id: articleId,
      },
    });

    revalidatePath("/admin/articles");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to delete article",
    };
  }
}
