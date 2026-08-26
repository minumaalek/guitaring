// import { getArticleById } from "@/db/queries/blog";
// import ArticleForm from "@/components/admin/article-form";
import ProductForm from "@/components/admin/product-form";
import { getProductById } from "@/db/queries/products";
import { getProductCategories } from "@/db/queries/category";

interface EditProductProps {
  params: Promise<{
    productId: string;
  }>;
}
export default async function EditArticle({ params }: EditProductProps) {
  const { productId } = await params;
  const product = await getProductById(+productId);
  const categories = await getProductCategories();
  return (
    <div>
      <h1>edit {product.title}</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
