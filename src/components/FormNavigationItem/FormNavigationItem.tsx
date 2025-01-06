import React from "react";
import { NavItem } from "@/types/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FormNavigationItemProps {
  isActive: boolean;
  navItem: NavItem;
}

const FormNavigationItem = ({ navItem, isActive }: FormNavigationItemProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 items-center p-4 rounded-md bg-violent-20 group h-[76px]",
        { "bg-violent-40": isActive },
      )}
    >
      <div className="p-3 bg-violent-10 rounded-md ">
        <Image src={navItem.icon} width={20} height={20} alt="nav icon" />
      </div>
      <div
        className={cn("text-base font-medium text-gray-70", {
          "text-white": isActive,
        })}
      >
        {navItem.name}
      </div>
    </div>
  );
};

export default FormNavigationItem;
