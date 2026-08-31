import ArticleCard from "@/components/blog/article-card";
import ItemsList from "@/components/modules/items-list";
import { getAllArticles } from "@/db/queries/articles";
import Link from "next/link";
export default async function BlogPage() {
  const articles = await getAllArticles();
  return (
    <div>
      <ItemsList empty={!articles.length && true}>
        {articles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </ItemsList>
    </div>
  );
}
