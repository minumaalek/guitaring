"use server";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import {
  signUpSchema,
  signInSchema,
  ActionResult,
} from "@/lib/sign-validations";

export async function signUpUser(
  data: unknown,
): Promise<ActionResult<typeof signUpSchema>> {
  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data",
      errors: result.error.flatten().fieldErrors,
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

export async function signInUser(
  data: unknown,
): Promise<ActionResult<typeof signInSchema>> {
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    user.password,
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  return {
    success: true,
    message: "Login successful",
  };
}
