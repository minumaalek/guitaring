import { getAllArticles } from "@/db/queries/articles";
import Link from "next/link";
export default async function BlogPage() {
  const articles = await getAllArticles();
  return (
    <div>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <Link className="text-black" href={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
