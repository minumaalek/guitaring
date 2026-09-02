import ProductsSection from "../products/product-section";
import { getAllProducts } from "@/db/queries/products";
import Link from "next/link";
export default async function HomeProducts() {
  const products = await getAllProducts();
  return (
    <div>
      <div className="flex items-center gap-3">
        <h2>New products</h2>
        <Link className="text-blue-500" href={"/products"}>
          More...
        </Link>
      </div>
      <ProductsSection products={products} />
    </div>
  );
}
