"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogContainer({ empty, children }) {
  const pathname = usePathname();
  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-2">
      {!empty ? (
        <div className="flex-col-center w-80 md:h-40 gap-3 md:grid md:grid-cols-3 md:w-full place-items-center">
          {children}
        </div>
      ) : (
        <p>Nothing yet</p>
      )}
    </div>
  );
}
