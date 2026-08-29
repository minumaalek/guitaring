import { z } from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  description: z.string().trim().optional(),

  slug: z.string().trim().min(3, "Slug must be at least 3 characters"),

  content: z.string().trim().min(1, "Content is required"),
  adminId: z.string(),
});
export const courseSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  description: z.string().trim().optional(),

  slug: z.string().trim().min(3, "Slug must be at least 3 characters"),

  content: z.string().trim().min(1, "Content is required"),
  adminId: z.string(),
});
