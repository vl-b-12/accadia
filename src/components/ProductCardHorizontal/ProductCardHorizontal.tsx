import React from "react";
import { Product } from "@/types/types";
import Image from "next/image";
import SkuBullet from "@/components/SkuBullet/SkuBullet";
import KaratsBullet from "@/components/KaratsBullet/KaratsBullet";
import { useDispatch } from "react-redux";
import { deleteProductFromCart } from "@/store/slices/CartSlice/cartSlice";
import { formatPrice } from "@/lib/utils";

interface ProductCardHorizontalProps {
  product: Product;
}

const ProductCardHorizontal = ({ product }: ProductCardHorizontalProps) => {
  const dispatch = useDispatch();

  const { currencySymbol, price } = formatPrice(product.price?.toString());

  const handleDelete = () => {
    dispatch(deleteProductFromCart(product.sku));
  };

  return (
    <div className="flex gap-1 w-full p-2 bg-violent-20 rounded-md">
      <div className="relative w-[148px] h-full">
        <Image
          src={product.image || "/mocks/product-image.png"}
          alt="Product Image"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex gap-3 p-6 bg-bg-violent-10 w-full">
        <div className="flex flex-col gap-1 justify-center w-56">
          <h3 className="text-sm font-bold uppercase tracking-wider">
            {product.collection}
          </h3>
          <div>
            <div className="text-sm font-medium mb-2">{product.name}</div>
            <SkuBullet sku={product.sku} className="w-fit" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 grow">
          <KaratsBullet karats={product.karats ?? "12"} type="horizontal" />
          {product?.descriptionData?.map((characteristic, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-10 rounded-md px-3 py-0.5 w-fit"
            >
              {/*<div className="text-xs font-semibold">{characteristic}:</div>*/}
              <div className="pl-1 text-xs font-medium text-gray-70">
                {characteristic}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between">
          <Image
            src="/icons/delete-icon.svg"
            alt="Product Image"
            width={32}
            height={32}
            className="self-end cursor-pointer"
            onClick={handleDelete}
          />

          <div className="text-xl font-light">
            {currencySymbol}
            <span className="pl-1 text-xl font-bold">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
