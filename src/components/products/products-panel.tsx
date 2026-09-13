"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductPriceRange from "./products-price-slider";
import ProductsDropdown from "./products-dropdown";
export default function ProductsPanel({}) {
  const pathname = usePathname();

  return (
    <div className="bg-blue-300 md:h-full md:fixed md:w-80 w-full flex-col-center">
      <h2>Filter</h2>
      <div className=" md:w-2/3 w-full h-1/2 flex flex-col">
        <span>Price</span>
        <ProductPriceRange />
        <ProductsDropdown />
      </div>
    </div>
  );
}
