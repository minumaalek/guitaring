import Link from "next/link";
import { getCategoryById } from "@/db/queries/category";
import Image from "next/image";
export default async function ProductCard({ product }) {
  const { title, originalPrice, newPrice, slug, id } = product;
  const category = await getCategoryById(id);
  return (
    <Link href={`products/${category?.slug}/${slug}`}>
      <div className="card size-80 flex items-center justify-start card-gradient bg-gray-500 group">
        {/* <div className="size-full card-gradient"></div> */}
        <div className="size-52 group-hover:size-56 relative">
          <Image
            alt="guitar"
            src="/images/product.png"
            fill
            className="object-cover absolute"
          />
        </div>
        <div className="absolute size-full bg-blue-400/50 group-hover:bg-blue-400/10 top-0 right-0">
          <div className="size-full flex flex-col items-center justify-end">
            <h3>{title}</h3>
            <div className="flex-row-center">
              <p className="old-price">{originalPrice}</p>
              <p className="price">{newPrice}</p>
            </div>
          </div>
        </div>
        {/* <div className="w-full h-1/2 bg-blue-300"></div>
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
      </div>*/}
      </div>
    </Link>
  );
}
