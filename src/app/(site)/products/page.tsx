import ItemsContainer from "@/components/modules/items-container";
import ProductPreviewCard from "@/components/products/product-preview-card";
import { getAllProducts } from "@/db/queries/products";
import { getSubCategories } from "@/db/queries/categories";
import CategoryCard from "@/components/categories/category-card";
import SplitH2 from "@/components/animated/split-h2";
export default async function ProductsPage() {
  const products = await getAllProducts();
  const subCategories = await getSubCategories(null, "products");
  return (
    <div className="p-20">
      <SplitH2 text={"All you need to start guitaring"} />
      {/* <ItemsContainer empty={!products.length && true} subCategories={subCategories}>
        {products.map((product) => {
          return <ProductPreviewCard product={product} />;
        })}
      </ItemsContainer> */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:place-items-center">
        {subCategories.map((cate) => {
          return (
            <CategoryCard
              key={cate.id}
              title={cate.name}
              slug={`/products/${cate.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
}
