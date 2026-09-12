"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function ProductsContainer({ empty, children }) {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col justify-between items-center">
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
