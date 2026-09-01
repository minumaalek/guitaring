interface ProductsCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}
import ItemsList from "@/components/modules/items-list";
import ProductCard from "@/components/products/product-card";
import { getProductsByCategory } from "@/db/queries/products";
import { getSubCategories } from "@/db/queries/categories";
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
      <ItemsList empty={!products.length && true} subCategories={subCategories}>
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </ItemsList>
    </div>
  );
}
