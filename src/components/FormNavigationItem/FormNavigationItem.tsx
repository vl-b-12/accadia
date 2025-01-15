import React from "react";
import { NavItem } from "@/types/types";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormNavigationItemProps {
  isActive: boolean;
  navItem: NavItem;
  setStep: (step: number) => void;
  disabled: boolean;
  type: "payment" | "default";
}

const FormNavigationItem = ({
  navItem,
  isActive,
  setStep,
  type,
  disabled,
}: FormNavigationItemProps) => {
  const isPaymentType = type === "payment";
  const form = useFormContext();
  const amount = form?.watch(navItem.dataKey ?? "");
  const { currencySymbol, price } = formatPrice(amount?.toString() || "0");

  return (
    <div
      className={cn(
        "flex gap-4 items-center p-4 rounded-md bg-violent-20 group h-[76px] cursor-pointer",
        {
          "bg-violent-40": isActive,
          "bg-violent-10": isPaymentType && !isActive,
          "h-[85px]": isPaymentType,
          "opacity-75 cursor-not-allowed": disabled && !isPaymentType,
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
          className={cn("text-base font-medium text-gray-70", {
            "text-white": isActive,
            "text-lg": isPaymentType,
          })}
        >
          {navItem.name}
        </div>
        {isPaymentType && (
          <div
            className={cn("text-[15px] text-gray-70 font-bold", {
              "text-gray-0": isActive,
            })}
          >
            <span className="text-[13px] font-normal pr-1.5">Paid:</span>
            <span>{currencySymbol}</span>
            {price}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormNavigationItem;
