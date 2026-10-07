import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
export default function CheckoutButton({ count }) {
  return (
    <Link href={"/account/checkout"}>
      <div className=" size-16 bg-blue-500 rounded-full absolute bottom-5 right-5 shadow-md shadow-black cursor-pointer flex-row-center">
        <ShoppingBasket className="size-12 stroke-white" />
        <span className="absolute bg-blue-900 bottom-0 right-0 rounded-full size-5 flex items-center justify-center">
          {count}
        </span>
      </div>
    </Link>
  );
}
