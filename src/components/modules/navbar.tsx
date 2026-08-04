import Logo from "../common/logo";
import NavbarDropdown from "../dropdowns/navbar-dropdown";
import { getNavbarCategories } from "@/db/queries/category";
import Link from "next/link";

export default async function Navbar() {
  const coursesCategories = await getNavbarCategories("courses");
  const productsCategories = await getNavbarCategories("products");

  return (
    <div className="flex justify-between bg-blue-500/70 backdrop-blur-sm p-2 w-full sticky top-0 z-50 border-b border-white/10 shadow-md shadow-black/10">
      <div className="flex ">
        <Logo />
        <div className="flex gap-2 justify-center">
          <NavbarDropdown category={coursesCategories} title="Courses" />
          <NavbarDropdown category={productsCategories} title="Products" />
          <button>Blog</button>
          <button>About</button>
        </div>
      </div>
      <Link href="signin">
        <button className="text-white main-gradient w-28 flex items-center justify-center">
          Get started
        </button>
      </Link>
    </div>
  );
}
