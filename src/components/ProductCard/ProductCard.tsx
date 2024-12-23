"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/types";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/store/slices/CartSlice/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (currentProduct: Product) => {
    dispatch(addProductToCart(currentProduct));
  };

  return (
    <div className="rounded-md bg-gray-0 w-full cursor-pointer">
      <div className="relative flex flex-col gap-6 px-3 pt-4">
        <div className="relative w-[212px] h-[152px] mx-auto">
          <Image
            src={product.image}
            alt="Product Image"
            fill
            objectFit="contain"
          />
        </div>
        <div className="absolute z-30 top-4 left-4 border rounded-md border-violent-80 text-xs font-medium text-gray-70 px-3 py-0.5">
          {product.sku}
        </div>

        <div className="px-2 py-1.5 bg-violent-20 rounded-md">
          <h2 className="text-sm font-bold uppercase mb-1">
            {product.collection}
          </h2>
          <h3 className="text-sm font-medium mb-1.5">{product.name}</h3>
          <div className="px-3 py-0.5 rounded-md bg-pink-default w-fit text-gray-0 text-xs font-semibold mb-2">
            {product.sku}
          </div>
          <div className="flex flex-col gap-1.5">
            {product.characteristics.map((characteristic) => (
              <div
                key={characteristic.id}
                className="px-3 py-0.5 rounded-md bg-violent-10 font-medium text-gray-70 w-fit [&:last-child]:text-violent-40 [&:last-child]:bg-gray-0"
              >
                {characteristic.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-1 justify-between py-3 px-6">
        <div>
          <span className="mr-1 text-xl font-light">$</span>
          <span className="text-xl font-bold">{product.price}</span>
        </div>
        <div
          className="text-violent-40 cursor-pointer"
          onClick={() => handleAddToCart(product)}
        >
          <span className="mr-1 text-xl font-light">+</span>
          <span className="text-xl font-bold">Add</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
