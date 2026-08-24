import { getAllArticles } from "@/db/queries/blog";
import { Edit, Plus } from "lucide-react";
import { deleteArticle } from "@/actions/article-actions";
import DeleteArticleButton from "@/components/admin/delete-article-button";

import Link from "next/link";

export default async function ArticlesPanel() {
  const articles = await getAllArticles();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2>Articles list</h2>
        <Link href={`articles/new`}>
          <button className="main-gradient w-24 flex items-center justify-center ">
            <Plus className="size-5" />
            new
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-4 place-items-center main-gradient rounded-sm">
        <p className="place-self-start">Title</p>
        <p>Created at</p>
        <p>Writer</p>
        <p>actions</p>
      </div>

      <ul>
        {articles.map((article) => {
          const deleteAction = deleteArticle.bind(null, article.id);

          return (
            <li key={article.id}>
              <div className="grid grid-cols-4 place-items-center bg-gray-100 p-1 mt-2 rounded-sm">
                <p className="place-self-start">{article.title}</p>

                <p>{article.createdAt.toLocaleDateString()}</p>

                <p>writer</p>

                <div className="flex gap-3">
                  <Link href={`articles/${article.id}`}>
                    <Edit className="stroke-black" />
                  </Link>

                  <DeleteArticleButton action={deleteAction} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
