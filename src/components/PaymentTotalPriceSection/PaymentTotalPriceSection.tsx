"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { formatPrice } from "@/lib/utils";

interface PaymentTotalPriceSectionState {
  step: number;
}

const PaymentTotalPriceSection = ({ step }: PaymentTotalPriceSectionState) => {
  const {
    totalPrice,
    tax = 0,
    paid,
    balanceDue,
  } = useSelector((state: RootState) => state.cart);

  const { currencySymbol, price } = formatPrice(totalPrice?.toString());
  const { price: formattedPaid } = formatPrice(paid?.toString());
  const { price: formattedBalanceDue } = formatPrice(balanceDue?.toString());

  return (
    <div className="p-4 bg-pink-default rounded-md flex justify-between items-center max-h-[118px]">
      <div className="size-12 bg-violent-10 rounded-md flex justify-center items-center">
        <Image
          src="/icons/money-icon.svg"
          alt="Money icon"
          width={20}
          height={20}
        />
      </div>
      <div className="flex gap-10 items-center">
        {step !== 0 && (
          <>
            <div className="flex flex-col items-end text-gray-0">
              <div className="text-[15px] font-medium">Paid:</div>
              <div className="text-xl font-bold">
                <span className="pr-1.5 font-normal">{currencySymbol}</span>
                {formattedPaid || "0.00"}
              </div>
            </div>
            <div className="flex flex-col items-end text-gray-0">
              <div className="text-[15px] font-medium">Balance Due:</div>
              <div className="text-xl font-bold">
                <span className="pr-1.5 font-normal">{currencySymbol}</span>
                {formattedBalanceDue || "0.00"}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col items-end">
          <div className="text-gray-0 text-lg font-medium">Total Price:</div>
          <div className="text-gray-0 text-[32px] font-bold">
            <span className="pr-1.5 font-normal">{currencySymbol}</span>
            {price}
          </div>
          <div className="font-semibold text-gray-0 text-sm">
            Including Tax {currencySymbol} {tax}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTotalPriceSection;
