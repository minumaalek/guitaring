import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  const { name, email, isTeacher } = session.user;
  console.log(session);
  if (!session) redirect("/signin");
  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <div className="h-full absolute left-0 top-0">
        <h2>Welcome dear {session?.user?.name?.split(" ")[0]}</h2>
        <div>
          <p>Full name: {name}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </div>
  );
}
