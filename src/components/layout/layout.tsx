import Navbar from "../modules/navbar";
import Grainient from "../animations/grainient";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="fixed inset-0 -z-10"></div>
      <main className="p-3">{children}</main>

      <footer></footer>
    </>
  );
}
