"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../app/icon.svg";
import NavLinksSection from "@/components/NavLinksSection/NavLinksSection";
import CartButton from "@/components/CartButton/CartButton";
import { usePathname, useRouter } from "next/navigation";
import FilteringSection from "@/components/FilteringSection/FilteringSection";
import { cn } from "@/lib/utils";

const noHeaderPaths = ["/login"];

const Header = () => {
  const [isFiltersSectionOpen, setIsFiltersSectionOpen] = useState(false);
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setIsFiltersSectionOpen(false);
    }
  }, [pathname]);

  if (noHeaderPaths.includes(pathname)) return null;

  return (
    <div className="fixed top-0 left-0 z-40 w-full bg-gray-0 flex gap-8 justify-between py-3 px-6 h-[90px]">
      <div className="flex gap-8 shrink-0 cursor-pointer">
        <Image src={logo} alt="Accadia Icon" width={60} height={62} />
        {!isFiltersSectionOpen && <NavLinksSection />}
      </div>

      <div
        className={cn("flex items-center gap-6", {
          "justify-end w-full": isFiltersSectionOpen,
        })}
      >
        {pathname == "/" && (
          <FilteringSection
            isOpen={isFiltersSectionOpen}
            setOpen={setIsFiltersSectionOpen}
          />
        )}

        <div className="flex items-center gap-6">
          <CartButton />
          <div
            className="flex items-center justify-center size-[66px] rounded-md bg-gray-10"
            onClick={() => {
              sessionStorage.removeItem("access_token");
              sessionStorage.removeItem("refresh_token");
              push("/login");
            }}
          >
            <Image
              src="/icons/logout-icon.svg"
              alt="Logout icon"
              width={25}
              height={22}
              className="opacity-20 hover:opacity-100 duration-300 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
