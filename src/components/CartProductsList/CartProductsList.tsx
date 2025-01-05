"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import ProductCardHorizontal from "@/components/ProductCardHorizontal/ProductCardHorizontal";
import { useRouter } from "next/navigation";

const CartProductsList = () => {
  const { push } = useRouter();
  const products = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    if (!products.length) {
      push("/");
    }
  }, [products]);

  return (
    <div className="flex flex-col gap-6 h-[calc(100%-80px)] overflow-y-auto">
      {products?.map((product) => (
        <ProductCardHorizontal key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CartProductsList;
