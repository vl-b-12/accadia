"use client";

import React from "react";
import Image from "next/image";
import logo from "../../../app/icon.svg";
import NavLinksSection from "@/components/NavLinksSection/NavLinksSection";
import CartButton from "@/components/CartButton/CartButton";
import { usePathname, useRouter } from "next/navigation";

const noHeaderPaths = ["/login"];

const Header = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  if (noHeaderPaths.includes(pathname)) return null;

  return (
    <div className="fixed top-0 left-0 z-40 w-full bg-gray-0 flex gap-1 justify-between py-3 px-6 h-[90px]">
      <div className="flex gap-8">
        <Image src={logo} alt="Accadia Icon" width={60} height={62} />
        <NavLinksSection />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center size-[66px] rounded-md">
          <Image
            src="/icons/filter-icon.svg"
            alt="Logout icon"
            width={25}
            height={22}
            className="opacity-20 hover:opacity-100 duration-300 cursor-pointer"
          />
        </div>
        <CartButton />
        <div
          className="flex items-center justify-center size-[66px] rounded-md bg-gray-10"
          onClick={() => {
            sessionStorage.removeItem("isLoggedIn");
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
  );
};

export default Header;
