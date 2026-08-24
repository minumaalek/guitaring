"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/common/input";
import { AdminSigninState } from "@/actions/admin-actions";

const initialState: AdminLoginState = {
  success: false,
  message: "",
};

export default function AdminSignInForm({ adminSignin }) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    adminSignin,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/admin");
    }
  }, [state.success, router]);

  return (
    <div className="w-2/3 flex-col-center">
      <form action={formAction}>
        <Input placeholder="Username" name="username" />

        <Input placeholder="Password" type="password" name="password" />

        {state.message && !state.success && (
          <p className="text-red-500 mt-3">{state.message}</p>
        )}

        <button type="submit" disabled={pending} className="main-gradient">
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
