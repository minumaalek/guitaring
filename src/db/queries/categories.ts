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

export async function getCategoryById(id: number) {
  return db.category.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getSubCategories(categoryName: string) {
  const category = await db.category.findFirst({
    where: {
      slug: categoryName,
    },
  });
  if (!category) {
    return [];
  }
  return db.category.findMany({
    where: {
      parentId: category.id,
    },
  });
}
