import Navbar from "../modules/navbar";
import BurgerMenu from "../menu/burger-menu";
import { getNavbarCategories } from "@/db/queries/categories";
import CategoriesList from "../menu/categories-list";
import CheckoutButton from "../account/checkout-button";
import { getCheckoutCount } from "@/db/queries/checkout";
import { auth } from "@/auth";

export default async function Layout({ children }) {
  const coursesCategories = await getNavbarCategories("courses");
  const productsCategories = await getNavbarCategories("products");

  const session = await auth();

  let checkoutCount = 0;

  if (session?.user?.id) {
    checkoutCount = await getCheckoutCount(session.user.id);
  }
  return (
    <>
      <div className="flex justify-start items-center gap-2 bg-blue-500/70 backdrop-blur-sm p-2 w-full sticky top-0 z-50 border-b border-white/10 shadow-md shadow-black/10">
        <div className="md:hidden">
          <BurgerMenu>
            <CategoriesList
              productsCategories={productsCategories}
              coursesCategories={coursesCategories}
              // closeHandler={closeHandler}
            />
          </BurgerMenu>
        </div>
        <Navbar
          productsCategories={productsCategories}
          coursesCategories={coursesCategories}
        />
      </div>

      <main className="">
        {children}
        <div className=" fixed bottom-3 right-3 z-50">
          <CheckoutButton count={checkoutCount} />
        </div>
      </main>

      <footer></footer>
    </>
  );
}
