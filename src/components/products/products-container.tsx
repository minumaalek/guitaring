"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function ProductsContainer({ empty, children, subCategories }) {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col justify-between items-center">
      {subCategories.length ? (
        <div className="w-full border-b border-blue-500 shadow-black/40 flex items-center px-2">
          <span>Categories:</span>
          <div className="w-1/3 p-1">
            {subCategories.map((sub) => {
              return (
                <Link
                  href={`${pathname}/${sub.name.toLowerCase().replace(" ", "-")}`}
                  key={sub.id}
                >
                  <button className="main-gradient shadow-md">
                    {sub.name}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="w-full h-full flex-col-center">
        {!empty ? (
          <div className="flex flex-col md:grid grid-cols-3 w-full p-5 gap-2">
            {children}
          </div>
        ) : (
          <p>Nothing yet</p>
        )}
      </div>
    </div>
  );
}
