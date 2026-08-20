import { addProductToCart } from "@/actions/product-actions";
import { getProductBySlug } from "@/db/queries/products";
interface ProductPageProps {
  params: Promise<{
    product: string;
  }>;
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;
  const productItem = await getProductBySlug(product);
  console.log(productItem.id);
  return (
    <div className="z-50">
      <h2>{productItem.title}</h2>
      <form action={addProductToCart.bind(null, productItem.id)}>
        <button
          className="bg-blue-300 cursor-pointer z-50 size-10"
          type="submit"
        >
          Buy
        </button>
      </form>
    </div>
  );
}
