import React from "react";
import { NavItem } from "@/types/types";
import FormNavigationItem from "@/components/FormNavigationItem/FormNavigationItem";

interface FormNavigationProps {
  step: number;
  setStep: (step: number) => void;
  navConfig: NavItem[];
}

const FormNavigation = ({ step, setStep, navConfig }: FormNavigationProps) => {
  return (
    <div className="grid grid-cols-4 gap-x-2.5">
      {navConfig.map((item) => (
        <FormNavigationItem
          key={item.id}
          navItem={item}
          isActive={step === item.id}
          onClick={setStep}
        />
      ))}
    </div>
  );
};

export default FormNavigation;
