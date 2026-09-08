import Logo from "../common/logo";
import NavbarDropdown from "../dropdowns/navbar-dropdown";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { getSession } from "@/lib/check-auth";

export default async function Navbar({
  coursesCategories,
  productsCategories,
}) {
  const session = await getSession();
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center justify-start gap-10">
        <Logo />
        <div className="hidden md:flex gap-10 justify-center items-center mt-1">
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
