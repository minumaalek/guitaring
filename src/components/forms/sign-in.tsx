"use client";

import { toast } from "sonner";
import Input from "./items/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/sign-validations";

import { z } from "zod";
export default function SignInForm({ action }) {
  type RegisterForm = z.infer<typeof signInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: RegisterForm) => {
    const result = await action(data);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setTimeout(() => {
      router.push("/account");
    }, 2000);
  };

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <h2 className="text-white">Log in to your account</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/4 flex flex-col gap-2"
      >
        <Input
          type="email"
          error={errors.email?.message}
          placeholder="Email"
          {...register("email")}
        />

        <Input
          type="password"
          error={errors.password?.message}
          placeholder="Password"
          {...register("password")}
        />

        <button type="submit" className="bg-blue-700 p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
}
