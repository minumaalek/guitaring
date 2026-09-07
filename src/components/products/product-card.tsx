"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getCategoryById } from "@/db/queries/categories";
import Image from "next/image";
export default function ProductCard({ product }) {
  const { title, originalPrice, newPrice, slug, id, image, route } = product;
  // const category = await getCategoryById(id);
  const path = usePathname();
  // const href = `${usePathname}`
  return (
    <Link
      href={route ? route : ""}
      className="inline-block w-32 md:w-56 md:h-64"
    >
      <div className="relative card w-36 h-48 md:w-56 md:h-64 flex items-center justify-start card-gradient bg-gray-500 group">
        {/* <div className="size-full card-gradient"></div> */}
        <div className="size-32 md:size-44 group-hover:size-48 relative">
          <Image
            alt="guitar"
            src={image}
            fill
            className="object-cover absolute"
          />
        </div>
        <div className="absolute size-full bg-blue-400/50 group-hover:bg-blue-400/10 top-0 right-0">
          <div className="size-full flex flex-col items-center justify-end">
            <div className="w-28 md:w-48">
              <h3 className="text-base truncate">{title}</h3>
            </div>
            <div className="flex-row-center">
              <p className="old-price">{originalPrice}</p>
              <p className="price">{newPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
