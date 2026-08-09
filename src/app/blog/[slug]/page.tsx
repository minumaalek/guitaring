import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/db/queries/blog";
import ArticleContent from "@/components/blog/article-content";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <h1>{article.title}</h1>

      {article.excerpt && <p>{article.excerpt}</p>}

      <ArticleContent content={article.content} />
    </article>
  );
}
