import ItemsList from "@/components/modules/items-list";
import ProductCard from "@/components/products/product-card";
import { getAllProducts } from "@/db/queries/products";
import { getSubCategories } from "@/db/queries/categories";
export default async function ProductsPage() {
  const products = await getAllProducts();
  const subCategories = await getSubCategories(null, "products");
  return (
    <div>
      <ItemsList empty={!products.length && true} subCategories={subCategories}>
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </ItemsList>
    </div>
  );
}
