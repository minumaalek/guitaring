import { addProductToCart } from "@/actions/product-actions";
import { getProductBySlug } from "@/db/queries/products";
import { getProductsByCategory } from "@/db/queries/products";
import ProductPage from "@/components/products/product-page";
interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function ProductCategoryPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const products = await getProductsByCategory(slug);
  if (product)
    return (
      <ProductPage product={product} addProductToCart={addProductToCart} />
    );
  return <div>hey</div>;
}
