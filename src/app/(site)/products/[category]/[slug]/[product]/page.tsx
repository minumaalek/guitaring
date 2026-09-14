import { ProductProps } from "../page";
import ProductPage from "@/components/products/product-page";
import { addProductToCart } from "@/actions/product-actions";
import { getProductBySlug } from "@/db/queries/products";
import { getProductsByCategory } from "@/db/queries/products";
export default async function SubCategoryProduct({ params }: ProductProps) {
  const { product } = await params;
  const productItem = await getProductBySlug(product);
  const products = await getProductsByCategory(product);
  console.log(params);
  if (productItem)
    return (
      <ProductPage product={productItem} addProductToCart={addProductToCart} />
    );
}
