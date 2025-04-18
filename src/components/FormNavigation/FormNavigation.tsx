import React from "react";
import { NavItem, PaymentType } from "@/types/types";
import FormNavigationItem from "@/components/FormNavigationItem/FormNavigationItem";

interface FormNavigationProps {
  step: number;
  navConfig: NavItem[];
  setStep: (step: number) => void;
  fulfilledSteps?: number;
  paymentType?: PaymentType;
  type?: "payment" | "default";
}

const FormNavigation = ({
  step,
  navConfig,
  setStep,
  fulfilledSteps = 0,
  paymentType,
  type = "default",
}: FormNavigationProps) => {
  return (
    <div className="grid grid-cols-4 gap-x-2.5">
      {navConfig.map((item) => (
        <FormNavigationItem
          type={type}
          key={item.id}
          navItem={item}
          isActive={step === item.id}
          setStep={setStep}
          disabled={item.id > fulfilledSteps + 1}
          paymentType={paymentType}
        />
      ))}
    </div>
  );
};

export default FormNavigation;
