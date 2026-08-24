import { cookies } from "next/headers";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_auth")?.value;

  if (!token) {
    return null;
  }

  const session = await db.adminSession.findUnique({
    where: {
      token,
    },
    include: {
      admin: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await db.adminSession.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session.admin;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/signin");
  }

  return admin;
}
