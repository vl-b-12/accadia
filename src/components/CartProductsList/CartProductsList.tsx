"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import ProductCardHorizontal from "@/components/ProductCardHorizontal/ProductCardHorizontal";
import { useRouter } from "next/navigation";
import { clearSelectedCustomer } from "@/store/slices/CustomerSlice/customerSlice";

const CartProductsList = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    if (!products.length) {
      push("/catalog");
      dispatch(clearSelectedCustomer());
    }
  }, [products]);

  return (
    <div className="flex flex-col gap-6 h-[calc(100%-80px)] overflow-y-auto">
      {products?.map((product, index) => (
        <ProductCardHorizontal
          key={`${product.name}_${index}`}
          product={product}
        />
      ))}
    </div>
  );
};

export default CartProductsList;
