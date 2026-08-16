import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/signin");
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {session?.user?.name}
      <h2>hey</h2>
    </div>
  );
}
