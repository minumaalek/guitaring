"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const optionsMap = [
    { key: 1, title: "Articles list", href: "articles" },
    { key: 2, title: "Add article", href: "articles/new" },
    { key: 3, title: "Products list", href: "products" },
  ];
  const isSignInPage = usePathname().split("/")[2] == "signin" ? true : false;
  if (isSignInPage) return null;
  return (
    <div className="h-full w-1/4 main-gradient rounded-none shadow-2xl flex items-center justify-center flex-col">
      <Link href={"/admin"}>
        <h1 className="">Dashboard</h1>
      </Link>
      <div className="flex flex-col items-start w-full p-10 gap-2">
        {optionsMap.map((option) => {
          return (
            <Link href={`/admin/${option.href}`} key={option.key}>
              <div className="bg-blue-500/50 p-1 w-60 rounded-md text-xl">
                {option.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
