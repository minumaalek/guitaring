import ItemsList from "@/components/modules/items-list";
import ProductCard from "@/components/products/product-card";
import { getAllProducts } from "@/db/queries/products";
export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div>
      <ItemsList empty={!products.length && true}>
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </ItemsList>
    </div>
  );
}
