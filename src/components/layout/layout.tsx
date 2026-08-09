import Navbar from "../modules/navbar";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-3">{children}</main>
      <footer></footer>
    </>
  );
}
