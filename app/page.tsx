"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { redirect } from "next/navigation";
import { useGetProductsQuery } from "@/store/services/productsApi";
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const lastProductCardRef = useRef<HTMLDivElement | null>(null);
  const { selectedFilters } = useSelector((state: RootState) => state.filter);

  const { data: products } = useGetProductsQuery({ page, ...selectedFilters });
  const isAuthenticated = sessionStorage.getItem("accessToken");

  // const [getInvoice] = useLazyGetInvoiceQuery();
  // const handleGetInvoice = async () => {
  //   const res = await getInvoice(1);
  //   console.log(res, "RES");
  //
  //   const a = document.createElement("a");
  //   document.body.appendChild(a);
  //   debugger;
  //   const url = window.URL.createObjectURL(res.data);
  //   a.href = url;
  //   a.download = res.data.filename || "file.pdf";
  //   a.click();
  //   setTimeout(() => {
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   }, 0);
  // };
  //
  // useEffect(() => {
  //   handleGetInvoice();
  // }, []);

  //TODO check auth later

  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.removeItem("accessToken");
      redirect("/login");
    }
  }, [isAuthenticated]);

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
