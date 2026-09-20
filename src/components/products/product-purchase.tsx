"use client";

import { useState, useTransition } from "react";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/actions/product-actions";
import { ShoppingBasket } from "lucide-react";
import { toast } from "sonner";

type ProductActionProps = {
  productId: number;
  inCart: boolean;
};

export default function ProductPurchase({
  productId,
  inCart,
}: ProductActionProps) {
  const [isInCart, setIsInCart] = useState(inCart);
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    startTransition(async () => {
      const result = await addProductToCart(productId);

      if (result.success) {
        setIsInCart(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const result = await removeProductFromCart(productId);

      if (result.success) {
        setIsInCart(false);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={isInCart ? handleRemove : handleAdd}
      className="bg-blue-300 cursor-pointer px-4 py-2 flex gap-1 items-center justify-center main-gradient"
    >
      <ShoppingBasket className="size-6" />
      {isPending
        ? isInCart
          ? "Removing..."
          : "Adding..."
        : isInCart
          ? "Remove"
          : "Add to cart"}
    </button>
  );
}
