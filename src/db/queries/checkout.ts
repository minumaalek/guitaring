import { db } from "@/db";

export async function getCheckoutCount(userId: string) {
  const [productsCount, coursesCount] = await Promise.all([
    db.cartItem.count({
      where: {
        cart: {
          userId,
        },
      },
    }),

    db.courseEnrollment.count({
      where: {
        userId,
        status: "PENDING",
      },
    }),
  ]);

  return productsCount + coursesCount;
}
