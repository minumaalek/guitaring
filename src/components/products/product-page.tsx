import { auth } from "@/auth";
import { db } from "@/db";

import CommentSection from "../comments/comment-section";
import CommentsList from "../comments/comments-list";
import ProductAction from "./product-purchase";
import Image from "next/image";
import { Heart } from "lucide-react";

export default async function ProductPage({ product }) {
  const { image, title, newPrice, originalPrice, description, content } =
    product;
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
    <div className="">
      <div className="grid grid-cols-2 place-items-center">
        <div className="">
          <h1>{title}</h1>
          <div className="size-96 relative">
            <Image
              alt="guitar"
              src={image}
              fill
              className="object-cover absolute"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-96 h-60 bg-blue-300/50">
            <p>{description}</p>
          </div>
          <div className="w-72 h-52 bg-blue-500/50 rounded-2xl">
            <div className="grid grid-cols-2">
              <div className="flex flex-col ">
                <div className="flex">
                  <span className="bg-red-500 rounded text-sm h-5">50%</span>
                  <span className="old-price">{originalPrice}</span>
                </div>
                <span className="price text-2xl">{newPrice}</span>
              </div>
              <div className="flex items-center gap-1 ">
                <select className="bg-white w-2/3">
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
                <span>Each</span>
              </div>
            </div>
            <div className="flex gap-1">
              <ProductAction productId={product.id} inCart={inCart} />
              <button className=" main-gradient flex items-center justify-center gap-1 min-w-32">
                <Heart className="size-5 fill-white" />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <CommentSection targetType="PRODUCT" targetId={product.id} />

      <div>
        <CommentsList targetType="PRODUCT" targetId={product.id} />
      </div>
    </div>
  );
}
