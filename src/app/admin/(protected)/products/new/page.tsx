import { getProductCategories } from "@/db/queries/category";
import ProductForm from "@/components/admin/product-form";

export default async function NewProductPanel() {
  const categories = await getProductCategories();
  return (
    <div>
      <h1>Add new product</h1>
      <div className="flex flex-col gap-1">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
