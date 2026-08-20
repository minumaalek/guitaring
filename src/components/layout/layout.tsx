import Navbar from "../modules/navbar";
import Grainient from "../animations/grainient";
import UserSidebar from "../account/user-sidebar";
import CheckoutButton from "@/components/account/checkout-button";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="p-3">
        {children}
        {/* <div className=" fixed inset-0 h-screen">

          <CheckoutButton />
        </div> */}
      </main>

      <footer></footer>
    </>
  );
}
