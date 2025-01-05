import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface LoginFormProps extends PropsWithChildren {
  className?: string;
}

const PageSection = ({ children, className }: LoginFormProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-md shadow-1 w-full h-full overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageSection;
