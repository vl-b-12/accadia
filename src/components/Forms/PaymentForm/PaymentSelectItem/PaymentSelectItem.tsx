import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PaymentSelectItemProps {
  icon: string;
  text: string;
  isActive: boolean;
}

const PaymentSelectItem = ({
  icon,
  text,
  isActive,
}: PaymentSelectItemProps) => {
  return (
    <div className="flex gap-6 items-center">
      <div
        className={cn(
          "size-11 rounded-md flex justify-center items-center bg-violent-10",
          {
            "bg-violent-40": isActive,
          },
        )}
      >
        <Image src={icon} width={20} height={20} alt="icon" unoptimized />
      </div>
      <div className="text-lg font-semibold">{text}</div>
    </div>
  );
};

export default PaymentSelectItem;
