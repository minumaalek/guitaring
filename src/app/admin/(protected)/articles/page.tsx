import { getAllArticles } from "@/db/queries/blog";
import { Edit, Plus } from "lucide-react";
import { deleteArticle } from "@/actions/article-actions";
import DeleteButton from "@/components/admin/delete-article-button";

import Link from "next/link";
import PanelItemsList from "@/components/modules/panel-items-list";

export default async function ArticlesPanel() {
  const articles = await getAllArticles();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col w-full justify-between">
          <PanelItemsList
            title={"Articles"}
            items={articles}
            deleteIt={deleteArticle}
          />
        </div>
      </div>
    </div>
  );
}
