"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";

const HomePage = () => {
  const products = useSelector((state: RootState) => state.cart.tempFilters);
  const [isLoggedIn] = useState(sessionStorage.getItem("isLoggedIn"));
  const { push } = useRouter();

  useEffect(() => {
    if (isLoggedIn !== "true") {
      push("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="px-4 pb-4 pt-[106px] min-h-[calc(100vh-106px)] bg-gray-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default HomePage;
