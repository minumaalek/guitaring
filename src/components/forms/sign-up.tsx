"use client";

import { toast } from "sonner";
import Input from "./items/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import { z } from "zod";
export default function SignUpForm({ action }) {
  type RegisterForm = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterForm) => {
    const result = await action(data);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded-r-3xl items-center justify-center bg-blue-900 gap-3">
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
        <label>
          <input type="checkbox" {...register("isTeacher")} />
          I'm a teacher
        </label>
        <button type="submit" className="bg-blue-700 p-2 rounded-md">
          Sign up
        </button>
      </form>
    </div>
  );
}
