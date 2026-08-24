import { adminSignin } from "@/actions/admin-actions";
import AdminSigninForm from "@/components/admin/admin-signin-form";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
export default async function AdminSignInPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin");
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/3 flex-col-center bg-blue-400/50 p-10 rounded-2xl h-80">
        <h1 className="text-blue-600 mb-10">Sign in as an admin</h1>
        <AdminSigninForm adminSignin={adminSignin} />
        <div className="w-2/3 flex-col-center"></div>
      </div>
    </div>
  );
}
