"use client";
import SignUpForm from "./sign-up";
import SignInForm from "./sign-in";
import { useState } from "react";
export default function FormContainer({ signIn, signUp }) {
  const [signUpForm, setSignUpForm] = useState(true);
  return (
    <div className="w-full h-full flex flex-col rounded-r-3xl items-center justify-center bg-blue-900 gap-3">
      {signUpForm ? (
        <SignUpForm action={signUp} />
      ) : (
        <SignInForm action={signIn} />
      )}
      <p className="clickable" onClick={() => setSignUpForm((prev) => !prev)}>
        {signUpForm ? "Already have an account?" : "Have no account?"}
      </p>
    </div>
  );
}
