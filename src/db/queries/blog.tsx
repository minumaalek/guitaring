import { db } from "..";
export async function getAllArticles() {
  return db.article.findMany();
}
export async function getArticleBySlug(slug: string) {
  return db.article.findFirst({
    where: {
      slug,
    },
  });
}
