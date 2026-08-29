import ProductForm from "@/components/admin/product-form";
import { getProductById } from "@/db/queries/products";
import { getCategoriesBySection } from "@/db/queries/categories";

interface EditProductProps {
  params: Promise<{
    productId: string;
  }>;
}
export default async function EditProduct({ params }: EditProductProps) {
  const { productId } = await params;
  const product = await getProductById(+productId);
  const categories = await getCategoriesBySection("courses");
  return (
    <div>
      <h1>edit {product.title}</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
