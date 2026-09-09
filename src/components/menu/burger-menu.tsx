"use client";

import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BurgerMenu({ coursesCategories, productsCategories }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const [menuVisible, setMenuVisible] = useState(false);
  const openHandler = () => {
    setOpen((prev) => !prev);
    setMenuVisible(true);
  };
  const closeHandler = () => {
    setMenuVisible(false);
    let time = setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col gap-1 cursor-pointer" onClick={openHandler}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border-2 border-white w-6" />
        ))}
      </div>
      <div
        className={`z-50 w-screen h-screen inset-0 fixed bg-black/70 backdrop-blur-lg ${open ? "opacity-100 visible" : "opacity-0 invisible"}  `}
        onClick={closeHandler}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`md:w-1/3 w-3/4  ${menuVisible ? "translate-x-0" : "-translate-x-full"} transition-all duration-500 h-full bg-blue-500/95 left-0 top-0  p-2 md:p-10 flex flex-col items-center `}
        >
          <div className="flex flex-col items-start justify-start pl-2 pt-10 gap-3 w-full h-full categories-list">
            <div className="flex flex-col categories-list">
              <p>Products</p>
              <ul className="flex flex-col gap-1">
                {productsCategories.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/products/${category.slug}`}
                        onClick={closeHandler}
                      >
                        <div className="flex items-center justify-between w-full bg-blue-400/20 p-1 rounded-md">
                          <span>{category.name}</span>
                          <ChevronRight />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col categories-list">
              <p>Courses</p>
              <ul className="flex flex-col gap-1">
                {coursesCategories.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/courses/${category.slug}`}
                        onClick={closeHandler}
                      >
                        <div className="flex items-center justify-between w-full bg-blue-400/20 p-1 rounded-md">
                          <span>{category.name}</span>
                          <ChevronRight />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-2 w-full h-full mt-5 ">
              <Link href={`/blog`} onClick={closeHandler} className="w-full">
                <div className="flex items-center justify-between w-full bg-blue-400/20  p-1 rounded-md">
                  <p>Blog</p>
                  <ChevronRight />
                </div>
              </Link>
              <Link href={`/about`} onClick={closeHandler} className="w-full">
                <div className="flex items-center justify-between w-full bg-blue-400/20 p-1 rounded-md">
                  <p>About</p>
                  <ChevronRight />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
