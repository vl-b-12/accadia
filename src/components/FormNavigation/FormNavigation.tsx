import React from "react";
import { NavItem } from "@/types/types";
import FormNavigationItem from "@/components/FormNavigationItem/FormNavigationItem";

interface FormNavigationProps {
  step: number;
  navConfig: NavItem[];
}

const FormNavigation = ({ step, navConfig }: FormNavigationProps) => {
  return (
    <div className="grid grid-cols-4 gap-x-2.5">
      {navConfig.map((item) => (
        <FormNavigationItem
          key={item.id}
          navItem={item}
          isActive={step === item.id}
        />
      ))}
    </div>
  );
};

export default FormNavigation;
