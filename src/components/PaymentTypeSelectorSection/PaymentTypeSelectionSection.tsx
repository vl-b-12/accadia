"use client";

import React from "react";
import PaymentTypeSelector from "@/components/PaymentTypeSelector/PaymentTypeSelector";
import { PaymentType } from "@/types/types";

//TODO check how icons work
interface PaymentTypeSelectionSectionProps {
  onClick: (value: PaymentType) => void;
}

const PaymentTypeSelectionSection = ({
  onClick,
}: PaymentTypeSelectionSectionProps) => {
  return (
    <div className="flex gap-4 w-full justify-center">
      <PaymentTypeSelector
        icon="/icons/wallet-icon.svg"
        text="Full Payment With One System"
        onClick={() => onClick("full")}
      />
      <PaymentTypeSelector
        icon="/icons/coins-icon.svg"
        text="Split Payment Across Systems"
        onClick={() => onClick("split")}
      />
    </div>
  );
};

export default PaymentTypeSelectionSection;
