import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import CartIcon from "@/components/CartButton/CartIcon/CartIcon";

const cartPages = ["/cart", "/add-customer"];

const CartButton = () => {
  const quantity = useSelector((state: RootState) => state.cart.totalQnt);
  const { push } = useRouter();
  const pathname = usePathname();

  const isCartPage = cartPages.includes(pathname);

  return (
    <div
      className={cn(
        "relative flex justify-center items-center size-[66px] border border-violent-30 hover:border-violent-40 rounded-md cursor-pointer duration-300",
        {
          "border-violent-40": !!quantity,
          "bg-violent-40": isCartPage,
        },
      )}
      onClick={() => push("/cart")}
    >
      <div
        className={cn(
          "opacity-20 hover:opacity-100 fill-violent-40 duration-300",
          {
            "opacity-100": !!quantity,
            "fill-white": isCartPage,
          },
        )}
      >
        <CartIcon />
      </div>
      {!!quantity && (
        <div
          className={cn(
            "absolute top-2 right-2 flex items-center justify-center bg-violent-40 border-2 border-gray-0 text-xs font-bold text-gray-0 size-6 text-center rounded-full",
            { "bg-white text-violent-40 border-violent-40": isCartPage },
          )}
        >
          {quantity}
        </div>
      )}
    </div>
  );
};

export default CartButton;
