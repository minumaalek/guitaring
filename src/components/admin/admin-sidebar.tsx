"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { adminLogout } from "@/actions/admin-actions";

export default function AdminSidebar() {
  const optionsMap = [
    { key: 1, title: "Articles list", href: "articles" },
    { key: 2, title: "Products list", href: "products" },
    { key: 3, title: "Add product", href: "products/new" },
    { key: 4, title: "Teachers", href: "teachers" },
    { key: 5, title: "Courses", href: "courses" },
    { key: 6, title: "Students", href: "students" },
  ];
  const [selectedKey, setSelectedKey] = useState(0);

  const isSignInPage = usePathname().split("/")[2] == "signin" ? true : false;
  if (isSignInPage) return null;
  return (
    <div className="h-full w-1/4 main-gradient rounded-none shadow-2xl flex items-center justify-center flex-col">
      <Link href={"/admin"} onClick={() => setSelectedKey(0)}>
        <h1 className="">Dashboard</h1>
      </Link>
      <div className="flex flex-col items-start w-full p-10 gap-2">
        {optionsMap.map((option) => {
          const isSelected = selectedKey == option.key;

          return (
            <Link
              href={`/admin/${option.href}`}
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
        <form action={adminLogout}>
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
