import { auth } from "@/auth";
import { db } from "@/db";

import CommentSection from "../comments/comment-section";
import CommentsList from "../comments/comments-list";
import ProductAction from "./product-purchase";

export default async function ProductPage({ product }) {
  const session = await auth();

  const cartItem = session?.user?.id
    ? await db.cartItem.findFirst({
        where: {
          productId: product.id,
          cart: {
            userId: session.user.id,
          },
        },
        select: {
          id: true,
        },
      })
    : null;

  const inCart = !!cartItem;

  return (
    <div className="z-50">
      <h2>{product.title}</h2>

      <ProductAction productId={product.id} inCart={inCart} />

      <CommentSection targetType="PRODUCT" targetId={product.id} />

      <div>
        <CommentsList targetType="PRODUCT" targetId={product.id} />
      </div>
    </div>
  );
}
