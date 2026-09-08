import Navbar from "../modules/navbar";
import BurgerMenu from "../menu/burger-menu";
import { getNavbarCategories } from "@/db/queries/categories";

export default async function Layout({ children }) {
  const coursesCategories = await getNavbarCategories("courses");
  const productsCategories = await getNavbarCategories("products");
  return (
    <>
      <div className="flex justify-start items-center gap-2 bg-blue-500/70 backdrop-blur-sm p-2 w-full sticky top-0 z-50 border-b border-white/10 shadow-md shadow-black/10">
        <div className="md:hidden">
          <BurgerMenu
            productsCategories={productsCategories}
            coursesCategories={coursesCategories}
          />
        </div>
        <Navbar
          productsCategories={productsCategories}
          coursesCategories={coursesCategories}
        />
      </div>

      <main className="">
        {children}
        {/* <div className=" fixed inset-0 h-screen">

          <CheckoutButton />
        </div> */}
      </main>

      <footer></footer>
    </>
  );
}
