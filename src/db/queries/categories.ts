import { db } from "..";
export async function getAllCategories() {
  return db.category.findMany();
}
export async function getCategoriesBySection(section) {
  return db.category.findMany({
    where: {
      section,
    },
  });
}

export async function getNavbarCategories(section: string) {
  return db.category.findMany({
    where: {
      section,
      parentId: null,
    },
    include: {
      children: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getCategoryById(id) {
  return db.category.findFirst({
    where: {
      id: id,
    },
  });
}
