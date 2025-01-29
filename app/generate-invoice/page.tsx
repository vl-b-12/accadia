import React from "react";
import PageSection from "@/components/PageSection/PageSection";
import Link from "next/link";
import Image from "next/image";

const GenerateInvoicePage = () => {
  return (
    <div className="pb-4 px-6 pt-[106px] min-h-screen bg-gray-5">
      <PageSection className="p-6 min-h-[calc(100vh-122px)] relative">
        <Link
          href="/catalog"
          className="block w-full text-xl font-semibold text-violent-60 underline underline-offset-1 decoration-1 text-end"
        >
          Back To Catalog
        </Link>
        <div className="flex flex-col justify-center items-center gap-8 max-w-[330px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/icons/gears-logo.svg"
            width={82}
            height={82}
            alt="gears logo"
            unoptimized
          />
          <div className="text-2xl font-semibold">
            Your invoice is generating
          </div>
          <Link
            href="/customers"
            className="py-6 px-8 border border-black rounded-md text-center text-base font-semibold text-violent-80 uppercase hover:bg-violent-20 duration-300"
          >
            Proceed to Customers
          </Link>
        </div>
      </PageSection>
    </div>
  );
};

export default GenerateInvoicePage;
