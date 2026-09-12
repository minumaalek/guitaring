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
import ProductMainCard from "@/components/products/product-main-card";
import ProductsPanel from "@/components/products/products-panel";
export default async function ProductsCategoryPage({
  params,
}: ProductsCategoryPageProps) {
  const { category } = await params;
  const products = await getProductsByCategory(category);
  const subCategories = await getSubCategories(category);
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className=" md:w-96 md:h-full relative">
        <ProductsPanel subCategories={subCategories} />
      </div>
      <div className=" md:w-full md:ml-5 w-full h-full">
        {/* <h1>{category}</h1> */}
        <ProductsContainer empty={!products.length && true}>
          {products.map((product) => {
            return <ProductMainCard product={product} />;
          })}
        </ProductsContainer>
      </div>
    </div>
  );
}
