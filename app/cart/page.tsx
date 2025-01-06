import React from "react";
import PageSection from "@/components/PageSection/PageSection";
import CartProductsList from "@/components/CartProductsList/CartProductsList";
import Link from "next/link";
import CartSidebar from "@/components/CartSidebar/CartSidebar";

const CartPage = () => {
  return (
    <div className="bg-gray-5 pt-[106px] pb-7 px-6 min-h-screen grid grid-cols-[2.4fr_1fr] gap-6">
      <PageSection className="px-3 py-4 max-h-[calc(100vh-110px)]">
        <h2 className="px-3 text-[32px] text-violent-80 font-bold mb-8">
          Shopping Cart
        </h2>
        <CartProductsList />
      </PageSection>
      <PageSection className="max-h-[calc(100vh-110px)] p-4 flex flex-col gap-6">
        <Link
          href="/"
          className="text-xl font-semibold text-violent-60 underline underline-offset-1 decoration-1 text-end"
        >
          Back To Catalog
        </Link>
        <CartSidebar />
      </PageSection>
    </div>
  );
};

export default CartPage;
