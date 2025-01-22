import React from "react";
import { NavItem, PaymentType } from "@/types/types";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";

interface FormNavigationItemProps {
  isActive: boolean;
  navItem: NavItem;
  setStep: (step: number) => void;
  disabled: boolean;
  type: "payment" | "default";
  paymentType?: PaymentType;
}

const FormNavigationItem = ({
  navItem,
  isActive,
  setStep,
  type,
  disabled,
  paymentType,
}: FormNavigationItemProps) => {
  const isPaymentType = type === "payment";
  const form = useFormContext();
  const amount = form?.watch(navItem.dataKey ?? "");
  const { currencySymbol, price } = formatPrice(amount?.toString() || "0");
  const isFullPayment = paymentType === "full";

  const {
    tax = 0,
    paid,
    balanceDue,
    grandTotal,
  } = useSelector((state: RootState) => state.cart);

  const { price: formattedBalanceDue } = formatPrice(balanceDue?.toString());

  return (
    <div
      className={cn(
        "flex gap-4 items-center p-4 rounded-md bg-violent-20 group h-[76px] cursor-pointer hover:bg-violent-40 duration-300 group",
        {
          "bg-violent-40": isActive,
          "bg-violent-10": isPaymentType && !isActive,
          "h-[85px]": isPaymentType,
          "opacity-75 cursor-not-allowed hover:bg-violent-20":
            disabled && !isPaymentType,
        },
      )}
      onClick={() => {
        if (!disabled || isPaymentType) {
          setStep(navItem.id);
        }
      }}
    >
      <div
        className={cn("p-3 bg-violent-10 rounded-md", {
          "bg-violent-20": isPaymentType,
          "opacity-50": disabled && !isPaymentType,
        })}
      >
        <Image src={navItem.icon} width={20} height={20} alt="nav icon" />
      </div>
      <div>
        <div
          className={cn(
            "text-base font-medium text-gray-70 group-hover:text-white",
            {
              "text-white": isActive,
              "text-lg": isPaymentType,
              "group-hover:text-gray-70": disabled && !isPaymentType,
            },
          )}
        >
          {navItem.name}
        </div>
        {isPaymentType && !isFullPayment && (
          <div
            className={cn("text-[15px] text-gray-70 font-bold", {
              "text-gray-0": isActive,
            })}
          >
            <span className="text-[13px] font-normal pr-1.5">Paid:</span>
            <span>{currencySymbol}</span>
            {price}
            <br/>
            <span className="text-[13px] font-normal pr-1.5">Balance due:</span>
            <span>{currencySymbol}</span>
            {formattedBalanceDue || "0.00"}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormNavigationItem;
