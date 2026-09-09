import { addProductToCart } from "@/actions/product-actions";
import { getProductBySlug } from "@/db/queries/products";
import { getProductsByCategory } from "@/db/queries/products";
import ProductPage from "@/components/products/product-page";
import ItemsContainer from "@/components/modules/items-container";
import ProductPreviewCard from "@/components/products/product-preview-card";
import ProductMainCard from "@/components/products/prodcut-main-card";
import ProductsContainer from "@/components/products/products-container";
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
      <ProductsContainer empty={!products.length && true} subCategories={[]}>
        {products.map((product, i) => {
          return <ProductMainCard product={product} />;
        })}
      </ProductsContainer>
    </div>
  );
}
