import Navbar from "../modules/navbar";
import Grainient from "../animations/grainient";
import UserSidebar from "../account/user-sidebar";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="fixed inset-0 -z-10">
        <UserSidebar />
      </div>
      <main className="p-3">{children}</main>

      <footer></footer>
    </>
  );
}
