import SidebarItems from "./sidebar-items";
import BurgerMenu from "../menu/burger-menu";

export default function PanelSideBar({ role }) {
  let optionsMap;
  if (role == "Teacher" || role == "User")
    optionsMap = [
      { key: 0, title: "Home", href: "/" },
      { key: 1, title: "Edit profile", href: "edit-profile" },
      { key: 2, title: "Checkout", href: "checkout" },
      { key: 3, title: "Joined courses", href: "user-courses" },
      ...(role == "Teacher"
        ? [{ key: 4, title: "My courses", href: "teacher-courses" }]
        : []),
      { key: 5, title: "Purchases", href: "purchases" },
      { key: 6, title: "Settings", href: "settings" },
    ];
  else if (role == "Admin")
    optionsMap = [
      { key: 0, title: "Home", href: "/" },
      { key: 1, title: "Articles", href: "articles" },
      { key: 2, title: "Products", href: "products" },
      { key: 3, title: "Courses", href: "courses" },
      { key: 4, title: "Teachers", href: "teachers" },
      { key: 5, title: "Students", href: "students" },
    ];
  return (
    <div className="">
      <SidebarItems role={role} optionsMap={optionsMap} />
    </div>
  );
}
