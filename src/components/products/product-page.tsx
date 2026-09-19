import { auth } from "@/auth";
import { db } from "@/db";

import CommentForm from "../comments/comment-form";
import CommentsList from "../comments/comments-list";
import ProductPurchase from "./product-purchase";
import Image from "next/image";
import { Heart } from "lucide-react";
import ArticleContent from "../blog/article-content";

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
    <div className="py-20 flex flex-col">
      <div className=" px-10">
        <div className="flex flex-col md:flex-row w-full gap-10">
          <div className="flex flex-col items-center md:w-1/2">
            <div className="flex flex-col md:items-end items-center justify-center w-full ">
              <h1>{title}</h1>
              <div className="size-80 md:size-96 relative">
                <Image
                  alt="guitar"
                  src={image}
                  fill
                  className="object-cover absolute"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between w-full ">
            <div className="h-full w-1/3 flex md:flex-col gap-3 p-2 rounded-2xl">
              <span>Brand</span>
              <span>Pickup</span>
            </div>
            <div className="flex-col-center w-full gap-5">
              <div className="w-full md:w-2/3 h-40">
                <p className="w-full">
                  {description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Placeat iusto, temporibus impedit eligendi
                  soluta itaque voluptatem nisi veritatis accusantium animi!
                </p>
              </div>
              <div className="md:w-2/3 h-40 bg-blue-400/50 rounded-2xl p-5 flex flex-col justify-between gap-3">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col ">
                    <div className="flex">
                      <span className="bg-blue-600 text-white rounded w-10 h-6 text-center">
                        50%
                      </span>
                      <span className="old-price">{originalPrice}</span>
                    </div>
                    <span className="price text-3xl">{newPrice}</span>
                  </div>
                  <div className="flex-col-center w-full gap-2">
                    <div className="flex w-full items-center gap-1 text-xl ">
                      <select className="bg-white w-2/3 rounded-xl font-bold">
                        <option value="">Black</option>
                        <option value="">2</option>
                        <option value="">3</option>
                      </select>
                      <span>Color</span>
                    </div>
                    <div className="flex w-full items-center gap-1 text-xl">
                      <select className="bg-white w-2/3 rounded-xl font-bold">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                      </select>
                      <span>Each</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <ProductPurchase productId={product.id} inCart={inCart} />
                  <button>
                    <Heart className="size-5 fill-white" />
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 relative p-2 gap-2 bg-blue-100">
        <ArticleContent content={content} />
        <div className="sticky">
          <CommentForm targetType="PRODUCT" targetId={product.id} />
          <div>
            <CommentsList targetType="PRODUCT" targetId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
