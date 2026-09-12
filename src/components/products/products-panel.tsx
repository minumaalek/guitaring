"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductPriceRange from "./products-price-slider";
export default function ProductsPanel({ subCategories }) {
  const pathname = usePathname();

  return (
    <div className="bg-blue-400 md:h-full md:fixed md:w-80 w-full z-50">
      <h2>Filter</h2>
      <div className="bg-blue-100 md:w-2/3 h-1/2 flex flex-col">
        <span>Price</span>
        <ProductPriceRange />
      </div>
      <div>
        {subCategories.length ? (
          <div className="w-full shadow-md shadow-black/40 flex items-center px-2">
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
      </div>
    </div>
  );
}
