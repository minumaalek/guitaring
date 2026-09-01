"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemsList({ empty, children, subCategories }) {
  const pathname = usePathname();
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      {pathname != "/blog" && subCategories.length ? (
        <div className="w-1/3 p-1 border-2 border-blue-500 rounded-full">
          {subCategories.map((sub) => {
            return (
              <Link
                href={`${pathname}/${sub.name.toLowerCase().replace(" ", "-")}`}
                key={sub.id}
              >
                <button className="main-gradient">{sub.name}</button>
              </Link>
            );
          })}
        </div>
      ) : null}

      <div className="w-full h-full flex-col-center">
        {!empty ? (
          <div className="grid grid-cols-4 place-items-center">{children}</div>
        ) : (
          <p>Nothing yet</p>
        )}
      </div>
    </div>
  );
}
