"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
// import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/store/services/productsApi";
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  // const { push } = useRouter();
  const lastProductCardRef = useRef<HTMLDivElement | null>(null);
  const { selectedFilters } = useSelector((state: RootState) => state.filter);

  const { data: products } = useGetProductsQuery({ page, ...selectedFilters });

  //TODO check auth later

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     sessionStorage.removeItem("accessToken");
  //     push("/login");
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    setPage(1);
  }, [selectedFilters]);

  useEffect(() => {
    if (products?.items) {
      if (products?.page > 1) {
        setProductsToShow((prevProducts) => [
          ...prevProducts,
          ...products.items,
        ]);
      } else {
        setProductsToShow(products.items);
      }
    }
  }, [products?.page, products?.items]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && products?.hasNextPage) {
        setPage((prev) => prev + 1);
      }
    });

    const currentRef = lastProductCardRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [products?.hasNextPage, productsToShow]);

  return (
    <div className="px-4 pb-4 pt-[106px] min-h-screen bg-gray-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[334px]">
      {productsToShow?.map((product, id) => {
        const isLastProductCard = id === productsToShow.length - 1;
        return (
          <ProductCard
            ref={isLastProductCard ? lastProductCardRef : null}
            key={`${product.name}_${id}`}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
