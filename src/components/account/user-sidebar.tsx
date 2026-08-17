"use client";

export default function AdminSidebar() {
  const optionsMap = [
    { key: 1, title: "Articles list", href: "articles" },
    { key: 2, title: "Add article", href: "articles/new" },
    { key: 3, title: "Products list", href: "products" },
  ];

  if (!isAccountPage) return null;
  return <div></div>;
}
