import React from "react";
import { NavItem } from "@/types/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FormNavigationItemProps {
  isActive: boolean;
  navItem: NavItem;
  onClick: (step: number) => void;
}

const FormNavigationItem = ({
  navItem,
  isActive,
  onClick,
}: FormNavigationItemProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 items-center p-4 rounded-md bg-violent-20 group hover:bg-violent-30 duration-300 cursor-pointer h-[76px]",
        { "bg-violent-40": isActive },
      )}
      onClick={() => onClick(navItem.id)}
    >
      <div className="p-3 bg-violent-10 rounded-md group-hover:opacity-70 duration-300">
        <Image src={navItem.icon} width={20} height={20} alt="nav icon" />
      </div>
      <div
        className={cn("text-base font-medium text-gray-70 duration-300", {
          "text-white": isActive,
        })}
      >
        {navItem.name}
      </div>
    </div>
  );
};

export default FormNavigationItem;
