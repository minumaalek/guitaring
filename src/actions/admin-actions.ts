"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { db } from "@/db";
import { redirect } from "next/navigation";

export type AdminSigninState = {
  success: boolean;
  message: string;
};

export async function adminSignin(
  _prevState: AdminSigninState,
  formData: FormData,
): Promise<AdminSigninState> {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return {
      success: false,
      message: "Username and password are required.",
    };
  }

  const admin = await db.admin.findUnique({
    where: {
      username,
    },
  });

  if (!admin) {
    return {
      success: false,
      message: "Invalid username or password.",
    };
  }

  const isValid = await bcrypt.compare(password, admin.password);

  if (!isValid) {
    return {
      success: false,
      message: "Invalid username or password.",
    };
  }

  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db.adminSession.create({
    data: {
      token,
      adminId: admin.id,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("admin_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return {
    success: true,
    message: "Sign in successful.",
  };
}

export async function adminLogout() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_auth")?.value;

  if (token) {
    await db.adminSession.deleteMany({
      where: {
        token,
      },
    });
  }

  cookieStore.delete("admin_auth");
}
