import { getAllArticles } from "@/db/queries/blog";
import ArticleCard from "../blog/article-card";
import Link from "next/link";
export default async function NewArticlesSection() {
  const articles = await getAllArticles();
  return (
    <div className="flex flex-col">
      <div className="flex items-center  gap-3">
        <h2>New articles</h2>
        <Link className="text-blue-500" href={"/blog"}>
          More...
        </Link>
      </div>
      {articles.map((article) => {
        return <ArticleCard key={article.id} article={article} />;
      })}
    </div>
  );
}
