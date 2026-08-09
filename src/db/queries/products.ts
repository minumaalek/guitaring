import { db } from "@/db";
export async function getAllProducts() {
  return db.product.findMany();
}
export async function getNewProducts() {
  return db.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
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
