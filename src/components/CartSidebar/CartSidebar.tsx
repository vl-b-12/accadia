"use client";

import React, { useState } from "react";
import TotalBreakdown from "@/components/TotalBreakdown/TotalBreakdown";
import SelectCustomer from "@/components/SelectCustomer/SelectCustomer";

const CartSidebar = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <TotalBreakdown step={step} />
      <SelectCustomer step={step} setStep={setStep} />
    </>
  );
};

export default CartSidebar;
