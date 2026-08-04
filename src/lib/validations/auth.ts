import { z } from "zod";
export type ActionResult = {
  success: boolean;
  message: string;
  errors?: z.inferFlattenedErrors<typeof registerSchema>["fieldErrors"];
};
export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, "First name is too short"),

    lastName: z.string().trim().min(2, "Last name is too short"),

    email: z.email("Invalid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    isTeacher: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
