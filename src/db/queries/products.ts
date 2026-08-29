import { db } from "@/db";
export async function getAllProducts() {
  return db.product.findMany({
    include: {
      admin: true,
    },
  });
}
export async function getNewProducts() {
  return db.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: {
      slug,
    },
  });
}
// export async function getPopularProducts() {
//   return db.product.findMany({
//     take: 4,
//     orderBy: {
//       salesCount: "desc",
//     },
//   });
// }

export async function getUserProducts(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      products: true,
    },
  });

  return user?.products ?? [];
}

export async function getPendingProducts(userId: string) {
  const cart = await db.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return cart?.items ?? [];
}

export async function getProductById(productId) {
  return db.product.findUnique({
    where: {
      id: productId,
    },
  });
}
