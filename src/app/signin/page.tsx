import { signInUser, signUpUser } from "@/actions/auth-actions";
import FormContainer from "@/components/sign/form-container";
import { getSession } from "@/lib/check-auth";
import { redirect } from "next/navigation";
export default async function SigninPage() {
  const session = await getSession();
  if (session) redirect("/account");
  return (
    <div className="flex items-center justify-center h-dvh w-screen overflow-hidden">
      <div className="bg-blue-500/70 h-3/4 w-2/3 shadow-xl rounded-3xl p-3 grid grid-cols-2">
        <div className="bg-sky-500 rounded-l-3xl shadow"></div>

        <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
          <FormContainer signIn={signInUser} signUp={signUpUser} />
        </div>
      </div>
    </div>
  );
}
