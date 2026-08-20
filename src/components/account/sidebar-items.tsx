"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
export default function UserSidebarItems({ isTeacher }) {
  const optionsMap = [
    { key: 0, title: "Home", href: "/(site)" },
    { key: 1, title: "Checkout", href: "checkout" },
    { key: 2, title: "Joined courses", href: "user-courses" },
    ...(isTeacher
      ? [{ key: 3, title: "My courses", href: "teacher-courses" }]
      : []),
    { key: 4, title: "Purchases", href: "purchases" },
    { key: 5, title: "Edit profile", href: "edit-profile" },
    { key: 6, title: "Settings", href: "settings" },
  ];
  const [selectedKey, setSelectedKey] = useState(0);
  const pathName = usePathname().split("/")[2];
  const router = useRouter();
  return (
    <div className="h-full w-1/4 main-gradient rounded-none shadow-2xl flex items-center justify-center flex-col">
      <button onClick={() => router.back()}>
        <ArrowBigLeft />
      </button>
      <Link href={"/account"}>
        <h2>{isTeacher ? "Teacher" : "Student"} dashboard</h2>
      </Link>
      <div className="flex flex-col items-start w-full p-10 gap-2">
        {optionsMap.map((option) => {
          const isSelected =
            selectedKey == option.key || pathName == option.href;

          return (
            <Link
              href={`/account/${option.href}`}
              key={option.key}
              onClick={() => setSelectedKey(option.key)}
            >
              <div
                className={` ${isSelected ? "bg-blue-500" : "bg-blue-500/50"} p-1 w-60 rounded-md text-xl`}
              >
                {option.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
