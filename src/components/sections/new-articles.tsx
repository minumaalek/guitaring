import { getAllArticles } from "@/db/queries/articles";
import ArticleCard from "../blog/card";
import Link from "next/link";
export default async function NewArticlesSection() {
  const articles = await getAllArticles();
  return (
    <div className="flex flex-col bg-blue-300 p-5 rounded-2xl">
      <div className="flex items-center  gap-3">
        <h2>New articles</h2>
        <Link className="text-blue-500" href={"/blog"}>
          More...
        </Link>
      </div>
      <div className="flex gap-10">
        {articles.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </div>
    </div>
  );
}
