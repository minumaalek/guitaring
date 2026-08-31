import Logo from "../common/logo";
import NavbarDropdown from "../dropdowns/navbar-dropdown";
import { getNavbarCategories } from "@/db/queries/categories";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { getSession } from "@/lib/check-auth";

export default async function Navbar() {
  const coursesCategories = await getNavbarCategories("courses");
  const productsCategories = await getNavbarCategories("products");
  const session = await getSession();
  console.log(coursesCategories);
  return (
    <div className="flex justify-between bg-blue-500/70 backdrop-blur-sm p-2 w-full sticky top-0 z-50 border-b border-white/10 shadow-md shadow-black/10">
      <div className="flex ">
        <Logo />
        <div className="flex gap-10 justify-center items-center">
          <NavbarDropdown category={coursesCategories} title="Courses" />
          <NavbarDropdown category={productsCategories} title="Products" />
          <Link href={"/blog"}>Blog</Link>
          <Link href={""}>About</Link>
        </div>
      </div>
      {session ? (
        <Link
          href={"/account"}
          className="size-10 flex items-center justify-center  main-gradient rounded-full"
        >
          <UserRound />
        </Link>
      ) : (
        <Link
          href="signin"
          className="text-white main-gradient w-28 flex items-center justify-center"
        >
          Get started
        </Link>
      )}
    </div>
  );
}
