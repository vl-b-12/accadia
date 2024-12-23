"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { cn } from "@/lib/utils";

const CartButton = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const quantity = cart.length;

  return (
    <div
      className={cn(
        "relative flex justify-center items-center size-[66px] border border-violent-30 hover:border-violent-40 rounded-md cursor-pointer duration-300",
        { "border-violent-40": !!quantity },
      )}
    >
      <Image
        src="/icons/cart-icon.svg"
        alt="Cart icon"
        width={24}
        height={24}
        className={cn("opacity-20 hover:opacity-100 duration-300", {
          "opacity-100": !!quantity,
        })}
      />
      {!!quantity && (
        <div
          className={cn(
            "absolute top-3 right-3 bg-violent-40 border-2 border-gray-0 text-xs font-bold text-gray-0 px-1 text-center rounded-full",
            { "right-1": quantity >= 10 },
          )}
        >
          {quantity}
        </div>
      )}
    </div>
  );
};

export default CartButton;
