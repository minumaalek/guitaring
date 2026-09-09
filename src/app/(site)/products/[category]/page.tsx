interface ProductsCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}
import ItemsContainer from "@/components/modules/items-container";
import ProductPreviewCard from "@/components/products/product-preview-card";
import { getProductsByCategory } from "@/db/queries/products";
import { getSubCategories } from "@/db/queries/categories";
import ProductsContainer from "@/components/products/products-container";
import ProductMainCard from "@/components/products/prodcut-main-card";
export default async function ProductsCategoryPage({
  params,
}: ProductsCategoryPageProps) {
  const { category } = await params;
  const products = await getProductsByCategory(category);
  const subCategories = await getSubCategories(category);
  console.log(products);
  return (
    <div>
      <h1>{category}</h1>
      <ProductsContainer
        empty={!products.length && true}
        subCategories={subCategories}
      >
        {products.map((product) => {
          return <ProductMainCard product={product} />;
        })}
      </ProductsContainer>
    </div>
  );
}
