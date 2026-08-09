// lib/auth.ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return session;
}
