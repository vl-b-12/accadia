"use client";

import React, { ForwardedRef, forwardRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/slices/CartSlice/cartSlice";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SkuBullet from "@/components/SkuBullet/SkuBullet";
import KaratsBullet from "@/components/KaratsBullet/KaratsBullet";
import { cn, formatPrice } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { RootState } from "@/store/storeTypes";

interface ProductCardProps {
  product: Product;
}

const ProductInfo = ({
  product,
  isDialogOpen,
}: {
  product: Product;
  isDialogOpen?: boolean;
}) => (
  <div className="px-2 py-1.5 bg-violent-20 rounded-md">
    <h2 className="text-sm font-bold uppercase mb-1 text-left">
      {product.collection}
    </h2>
    <h3 className="text-sm font-medium mb-1.5 text-left">{product.name}</h3>
    <KaratsBullet karats="12" />
    {isDialogOpen && (
      <div className="flex flex-col gap-1.5">
        {product.descriptionData.map((description, id) => (
          <div
            key={`${description}_${id}`}
            className="px-3 py-0.5 rounded-md text-xs bg-violent-10 font-medium text-gray-70 w-fit max-w-full [&:last-child]:text-violent-40 [&:last-child]:bg-gray-0 text-left truncate"
          >
            {description}
          </div>
        ))}
      </div>
    )}
  </div>
);

const ProductFooter = ({
  product,
  onClick,
  isDisabled = false,
}: {
  product: Product;
  onClick: (product: Product) => void;
  isDisabled?: boolean;
}) => {
  const { currencySymbol, price } = formatPrice(product.price?.toString());

  return (
    <div className="flex gap-1 justify-between py-3 px-6">
      <div>
        <span className="mr-1 text-xl font-light">{currencySymbol}</span>
        <span className="text-xl font-bold">{price}</span>
      </div>
      <div
        className={cn("text-violent-40 cursor-pointer", {
          "": isDisabled,
        })}
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) {
            onClick(product);
          }
        }}
      >
        {isDisabled ? (
          <>
            <span className="mr-1 text-xl text-gray-25 font-bold uppercase cursor-not-allowed">
              Added
            </span>
          </>
        ) : (
          <>
            <span className="mr-1 text-xl font-light">+</span>
            <span className="text-xl font-bold">ADD</span>
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard = forwardRef(
  ({ product }: ProductCardProps, ref: ForwardedRef<HTMLDivElement | null>) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);

    const isAddingDisabled = !!cart.find(
      (cartItem) => cartItem.name === product.name,
    );

    const handleAddToCart = (currentProduct: Product) => {
      dispatch(addProductToCart(currentProduct));
      setIsDialogOpen(false);
    };

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <div
            className="rounded-md bg-gray-0 w-full cursor-pointer h-full"
            ref={ref}
          >
            <div className="relative flex flex-col gap-6 px-3 pt-4">
              <div className="relative w-[212px] h-[152px] mx-auto">
                <Image
                  src={product.image || "/mocks/product-image.png"}
                  alt="Product Image"
                  fill
                  className="object-contain"
                />
              </div>
              <SkuBullet
                sku={product.sku}
                className="absolute z-30 top-4 left-4 "
              />
              <ProductInfo product={product} isDialogOpen={isDialogOpen} />
            </div>
            <ProductFooter
              product={product}
              onClick={handleAddToCart}
              isDisabled={isAddingDisabled}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="px-3 pt-4 pb-3 gap-6">
          <VisuallyHidden>
            <DialogTitle>{product.name}</DialogTitle>
          </VisuallyHidden>
          <div className="relative w-[442px] h-[378px] mx-auto">
            <Image
              src={product.image || "/mocks/product-image.png"}
              alt="Product Image"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <ProductInfo product={product} isDialogOpen={isDialogOpen} />
            <ProductFooter
              product={product}
              onClick={handleAddToCart}
              isDisabled={isAddingDisabled}
            />
          </div>

          <SkuBullet
            sku={product.sku}
            className="absolute z-30 top-4 left-4 "
          />
        </DialogContent>
      </Dialog>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
