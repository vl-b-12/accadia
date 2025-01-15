"use client";

import React from "react";
import NavLink from "@/components/NavLink/NavLink";
import { usePathname } from "next/navigation";

const NavLinksSection = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-8">
      <NavLink
        href="/"
        text="Catalog"
        iconWidth={24}
        iconHeight={24}
        icon="/icons/ring-icon.svg"
        activeIcon="/icons/ring-icon-active.svg"
        isActive={pathname === "/"}
      />
      <NavLink
        href="/customers"
        text="Customers"
        icon="/icons/user-icon.svg"
        activeIcon="/icons/user-icon-active.svg"
        isActive={pathname === "/customers"}
        iconWidth={18}
        iconHeight={18}
      />
    </div>
  );
};

export default NavLinksSection;
