"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import { logoutUser } from "@/actions/user-actions";
export default function UserSidebarItems({ role, closeHandler, optionsMap }) {
  const [selectedKey, setSelectedKey] = useState(0);
  const pathName = usePathname().split("/")[2];
  const router = useRouter();
  return (
    <div className="h-full  flex items-center justify-center flex-col">
      <button onClick={() => router.back()}>
        <ArrowBigLeft />
      </button>
      <Link href={"/account"}>
        <h2>{role} dashboard</h2>
      </Link>
      <div className="flex flex-col items-start w-full p-10 gap-2">
        {optionsMap.map((option) => {
          const isSelected = pathName == option.href;

          return (
            <Link
              href={`/${role == "User" || role == "Teacher" ? "account" : "admin"}/${option.href}`}
              key={option.key}
              onClick={() => {
                setSelectedKey(option.key);
                closeHandler();
              }}
            >
              <div
                className={` ${isSelected ? "bg-blue-500" : "bg-blue-500/50"} p-1 w-60 rounded-md text-xl`}
              >
                {option.title}
              </div>
            </Link>
          );
        })}
        <form action={logoutUser}>
          <button
            type="submit"
            className="bg-blue-500/50 p-1 w-60 rounded-md text-xl text-left"
          >
            Exit
          </button>
        </form>
      </div>
    </div>
  );
}
