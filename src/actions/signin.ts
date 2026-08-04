// actions/signin.ts

"use server";

import { db } from "@/db";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations/auth";

export async function registerUser(data: unknown) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data",
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  await db.user.create({
    data: {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      password: hashedPassword,
      isTeacher: result.data.isTeacher,
    },
  });

  return {
    success: true,
    message: "Account created successfully",
  };
}
