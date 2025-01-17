import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Customer } from "@/types/types";
import { useRouter } from "next/navigation";

interface CustomersSearchSectionProps {
  search: string;
  setSearch: (search: string) => void;
  customers?: Customer[];
}

const CustomersSearchSection = ({
  search,
  setSearch,
  customers,
}: CustomersSearchSectionProps) => {
  const { push } = useRouter();
  return (
    <div className="p-6 flex justify-between gap-10 items-center">
      <div className="text-2xl font-medium">
        Customers: {customers?.length || 0}
      </div>
      <div className="flex gap-6">
        <div className="relative">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-[452px] border-violent-40 placeholder:text-sm placeholder:text-violent-30 font-semibold pr-8 text-base text-black"
          />
          <Image
            src="/icons/search-icon.svg"
            alt="search icon"
            width={20}
            height={20}
            className="absolute top-1/2 -translate-y-1/2 right-3"
            unoptimized
          />
        </div>

        <Button
          variant="outline"
          className="flex gap-2 justify-center items-center w-[164px] h-[58px] text-base font-semibold uppercase text-violent-30 border-violent-40 hover:bg-violent-10 hover:text-violent-40"
          onClick={() => push("/add-customer")}
        >
          <Image
            src="/icons/plus-icon.svg"
            alt="plus icon"
            width={20}
            height={20}
            unoptimized
          />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default CustomersSearchSection;
