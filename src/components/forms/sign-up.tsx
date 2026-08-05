"use client";

import { toast } from "sonner";
import Input from "./items/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/sign-validations";
import { z } from "zod";
export default function SignUpForm({ action }) {
  type RegisterForm = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(signUpSchema),
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
    <div className="w-full  flex items-center justify-center flex-col">
      <h2 className="text-white">Create an account</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/4 flex flex-col gap-2"
      >
        <div className="flex gap-2">
          <Input
            type="text"
            error={errors.firstName?.message}
            placeholder="First name"
            {...register("firstName")}
          />

          <Input
            type="text"
            error={errors.lastName?.message}
            placeholder="Last name"
            {...register("lastName")}
          />
        </div>

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

        <Input
          type="password"
          error={errors.confirmPassword?.message}
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        <div className="w-full flex items-center justify-center">
          <label className="flex items-center justify-center gap-2 w-full cursor-pointer">
            <input
              className="size-4"
              type="checkbox"
              {...register("isTeacher")}
            />
            <p className=" text-white">I'm a teacher.</p>
          </label>
        </div>

        <button type="submit" className="bg-blue-700 p-2 rounded-md">
          Sign up
        </button>
      </form>
    </div>
  );
}
