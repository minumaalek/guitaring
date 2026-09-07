"use client";

import { useState, useTransition } from "react";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/actions/product-actions";

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
      await addProductToCart(productId);
      setIsInCart(true);
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await removeProductFromCart(productId);
      setIsInCart(false);
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={isInCart ? handleRemove : handleAdd}
      className="bg-blue-300 cursor-pointer px-4 py-2"
    >
      {isPending
        ? isInCart
          ? "Removing..."
          : "Adding..."
        : isInCart
          ? "Remove"
          : "Buy"}
    </button>
  );
}
