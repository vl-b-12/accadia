"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { formatPrice } from "@/lib/utils";

interface TotalBreakdownProps {
  step: number;
}

const TotalBreakdown = ({ step }: TotalBreakdownProps) => {
  const cart = useSelector((state: RootState) => state.cart);

  const { currencySymbol, price } = formatPrice(cart.totalPrice);

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 pt-4 mb-4 flex flex-col gap-3">
        {cart.karatsBreakdown?.map((karat) => (
          <div key={karat.karats} className="flex items-center">
            <div className="text-sm font-medium whitespace-nowrap">
              Item with {karat.karats} diamonds
            </div>
            <div className="h-3 grow border-b border-black border-dotted mx-2" />
            <div className="text-sm font-medium whitespace-nowrap">
              {karat.quantity}
            </div>
          </div>
        ))}
      </div>
      {step === 1 && (
        <div className="flex justify-between gap-1 p-4 bg-violent-10 rounded-md">
          <div className="font-medium">Total:</div>
          <div className="text-xl font-light">
            {currencySymbol} <span className="font-bold">{price}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalBreakdown;
