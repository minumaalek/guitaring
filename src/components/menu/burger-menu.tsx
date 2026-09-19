"use client";

import { useEffect, useState } from "react";
import { cloneElement } from "react";

export default function BurgerMenu({ children }) {
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
          {cloneElement(children, { closeHandler })}{" "}
        </div>
      </div>
    </>
  );
}
