import Link from "next/link";
import { getCategoryById } from "@/db/queries/categories";
import Image from "next/image";
export default async function ProductCard({ product }) {
  const { title, originalPrice, newPrice, slug, id, image } = product;
  const category = await getCategoryById(id);
  return (
    <Link href={`products/${category?.slug}/${slug}`}>
      <div className="card size-56 flex items-center justify-start card-gradient bg-gray-500 group">
        {/* <div className="size-full card-gradient"></div> */}
        <div className="size-44 group-hover:size-48 relative">
          <Image
            alt="guitar"
            src={image}
            fill
            className="object-cover absolute"
          />
        </div>
        <div className="absolute size-full bg-blue-400/50 group-hover:bg-blue-400/10 top-0 right-0">
          <div className="size-full flex flex-col items-center justify-end">
            <div className="w-48">
              <h3 className="text-lg truncate">
                {title.split(" ").slice(0, 2).join(" ")}
                {title.split(" ").length > 2 && "..."}
              </h3>
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
