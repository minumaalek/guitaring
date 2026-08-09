import Link from "next/link";
import { getCategoryById } from "@/db/queries/category";
export default async function ProductCard({ product }) {
  const { title, originalPrice, newPrice, slug, id } = product;
  const category = await getCategoryById(id);
  return (
    <div className="border size-72 flex-col-center justify-start p-2">
      <div className="w-full h-1/2 bg-blue-300"></div>
      <div className=" flex-col-center w-full">
        <h3>{title}</h3>
        <div className="flex-row-center">
          <p className="old-price">{originalPrice}</p>
          <p className="price">{newPrice}</p>
        </div>
        <Link
          href={`products/${category?.slug}/${slug}`}
          className="bg-blue-600 p-1 w-2/3 rounded-md items-center justify-center"
        >
          see more
        </Link>
      </div>
    </div>
  );
}
