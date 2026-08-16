"use client";

import { createArticle, editArticle } from "@/actions/article-actions";
import MarkdownEditor from "./mark-down-editor";
import { useState } from "react";

export default function ArticleForm({ article }) {
  const [content, setContent] = useState(article?.content ?? "");

  const editAction = article
    ? editArticle.bind(null, article.id)
    : createArticle;

  return (
    <form action={editAction}>
      <div className="w-1/2 flex flex-col gap-3">
        <input
          name="title"
          placeholder="title"
          defaultValue={article?.title ?? ""}
        />

        <input
          name="description"
          placeholder="description"
          defaultValue={article?.description ?? ""}
        />

        <input
          name="slug"
          placeholder="slug"
          defaultValue={article?.slug ?? ""}
        />

        <MarkdownEditor value={content} onChange={setContent} />

        <button className="main-gradient" type="submit">
          {article ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}
