"use server";

import { db } from "@/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
  await signIn("credentials", {
    email: result.data.email,
    password: result.data.password,
    redirectTo: "/account",
  });

  return {
    success: true,
    message: "Account created successfully",
  };
}

export async function signInUser(data: unknown) {
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data",
    };
  }

  try {
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo: "/account",
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    throw error;
  }
}
