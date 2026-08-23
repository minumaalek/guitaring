"use client";
import Input from "@/components/common/input";
import { useState } from "react";
export default function EditProfileForm({
  info,
  updateProfile,
  changePassword,
}) {
  return (
    <div>
      <form action={updateProfile} className="w-3/4 flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            type="text"
            // error={errors.firstName?.message}
            placeholder="First name"
            name="firstName"
            defaultValue={info.name.split(" ")[0]}

            // {...register("firstName")}
          />

          <Input
            type="text"
            // error={errors.lastName?.message}
            placeholder="Last name"
            name="lastName"
            defaultValue={info.name.split(" ")[1]}

            // {...register("lastName")}
          />
        </div>

        <Input
          type="email"
          //   error={errors.email?.message}
          placeholder="Email"
          name="email"
          defaultValue={info.email}

          //   {...register("email")}
        />

        <div className="w-full flex items-center justify-center">
          <label className="flex items-center justify-center gap-2 w-full cursor-pointer">
            <input
              className="size-4"
              type="checkbox"
              name="isTeacher"
              //   {...register("isTeacher")}
              defaultChecked={info.isTeacher}
            />
            <p className=" text-white">I'm a teacher.</p>
          </label>
        </div>

        <button type="submit" className="bg-blue-700 p-2 rounded-md">
          Save
        </button>
      </form>
      <form action={changePassword}>
        <Input
          type="password"
          name="newPassword"
          //   error={errors.password?.message}
          placeholder="New password"
        />

        <Input
          type="password"
          name="confirmPassword"
          //   error={errors.confirmPassword?.message}
          placeholder="Confirm password"
          //   {...register("confirmPassword")}
        />
        <button type="submit" className="bg-blue-700 p-2 rounded-md">
          Change
        </button>
      </form>
    </div>
  );
}
