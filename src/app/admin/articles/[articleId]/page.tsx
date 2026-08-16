import { getArticleById } from "@/db/queries/blog";
import ArticleForm from "@/components/admin/article-form";
interface EditArticleProps {
  params: Promise<{
    articleId: string;
  }>;
}
export default async function EditArticle({ params }: EditArticleProps) {
  const { articleId } = await params;
  const article = await getArticleById(+articleId);
  return (
    <div>
      <h1>edit {article.title}</h1>
      <ArticleForm article={article} />
    </div>
  );
}
