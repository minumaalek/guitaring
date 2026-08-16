import { getAllArticles } from "@/db/queries/blog";
import { Edit, Trash, Plus } from "lucide-react";
import { deleteArticle } from "@/actions/article-actions";
import ActionForm from "@/components/admin/action-form";

import Link from "next/link";
export default async function ArticlesPanel() {
  const articles = await getAllArticles();

  return (
    <div>
      <Link href={`articles/new`}>
        <button className="main-gradient w-24 h-10 flex items-center justify-center gap-1">
          <Plus />
          new
        </button>
      </Link>
      <ul>
        {articles.map((article) => {
          const deleteAction = deleteArticle.bind(null, article.id);

          return (
            <li key={article.id} className="">
              <div className="flex gap-2 bg-gray-100 p-1 mt-2">
                {article.title}
                <div className="flex gap-3 ">
                  <Link href={`articles/${article.id}`}>
                    <Edit className="stroke-black" />
                  </Link>
                  <ActionForm action={deleteAction}>
                    <button type="submit">
                      <Trash className="stroke-black" />
                    </button>
                  </ActionForm>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
