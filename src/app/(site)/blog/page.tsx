import ArticleCard from "@/components/blog/article-card";
import { getAllArticles } from "@/db/queries/articles";
import BlogContainer from "@/components/blog/blog-container";
export default async function BlogPage() {
  const articles = await getAllArticles();
  return (
    <div className="w-screen">
      <BlogContainer empty={!articles.length && true}>
        {articles.map((article) => {
          return (
            <div className="h-32 w-full">
              <ArticleCard article={article} />
            </div>
          );
        })}
      </BlogContainer>
    </div>
  );
}
