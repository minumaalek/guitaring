import { addProductToCart } from "@/actions/product-actions";
import { getProductBySlug } from "@/db/queries/products";
import { getProductsByCategory } from "@/db/queries/products";
import ProductPage from "@/components/products/product-page";
import ItemsList from "@/components/modules/items-list";
import ProductCard from "@/components/products/product-card";
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
  console.log(products);
  if (product)
    return (
      <ProductPage product={product} addProductToCart={addProductToCart} />
    );
  return (
    <div>
      <ItemsList empty={!products.length && true} subCategories={[]}>
        {products.map((product, i) => {
          return <ProductCard product={product} />;
        })}
      </ItemsList>
    </div>
  );
}
