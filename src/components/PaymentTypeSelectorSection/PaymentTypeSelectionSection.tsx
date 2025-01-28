"use client";

import React from "react";
import PaymentTypeSelector from "@/components/PaymentTypeSelector/PaymentTypeSelector";
import { PaymentType } from "@/types/types";

interface PaymentTypeSelectionSectionProps {
  onClick: (value: PaymentType) => void;
}

const PaymentTypeSelectionSection = ({
  onClick,
}: PaymentTypeSelectionSectionProps) => {
  return (
    <div className="flex gap-4 w-full justify-center">
      <PaymentTypeSelector
        type="full"
        text="Full Payment With One System"
        onClick={() => onClick("full")}
      />
      <PaymentTypeSelector
        type="split"
        text="Split Payment Across Systems"
        onClick={() => onClick("split")}
      />
    </div>
  );
};

export default PaymentTypeSelectionSection;
