"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function UserSidebarItems({ isTeacher }) {
  const optionsMap = [
    { key: 1, title: "Joined courses", href: "user-courses" },
    ...(isTeacher
      ? [{ key: 2, title: "My courses", href: "teacher-courses" }]
      : []),
    { key: 3, title: "Edit profile", href: "edit-profile" },
    { key: 4, title: "Settings", href: "settings" },
  ];
  const [selectedKey, setSelectedKey] = useState(0);
  const pathName = usePathname().split("/")[2];
  return (
    <div className="h-full w-1/4 main-gradient rounded-none shadow-2xl flex items-center justify-center flex-col">
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
