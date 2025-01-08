import React from "react";
import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CustomFormLabelProps {
  label: string;
  isRequired?: boolean;
  className?: string;
}

const CustomFormLabel = ({
  label,
  isRequired = false,
  className,
}: CustomFormLabelProps) => {
  return (
    <FormLabel className={cn("text-base font-medium", className)}>
      {label}
      {isRequired && <span className="pl-1 text-sm text-red-500">*</span>}
    </FormLabel>
  );
};

export default CustomFormLabel;
