import ArticleCard from "@/components/blog/article-card";
import ItemsContainer from "@/components/modules/items-container";
import { getAllArticles } from "@/db/queries/articles";
import Link from "next/link";
export default async function BlogPage() {
  const articles = await getAllArticles();
  return (
    <div>
      <ItemsContainer empty={!articles.length && true}>
        {articles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </ItemsContainer>
    </div>
  );
}
