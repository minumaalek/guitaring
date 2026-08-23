"use server";

import { db } from "@/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth } from "@/auth";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "@/lib/validations/update-user-validations";

import {
  signUpSchema,
  signInSchema,
  ActionResult,
} from "@/lib/validations/sign-validations";

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

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    isTeacher: formData.get("isTeacher") === "on",
  };

  const result = updateProfileSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        isTeacher: result.data.isTeacher,
      },
    });

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function changePassword(data: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const result = changePasswordSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid data.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { currentPassword, newPassword } = result.data;

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const passwordIsCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!passwordIsCorrect) {
      return {
        success: false,
        message: "Current password is incorrect.",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password changed successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
