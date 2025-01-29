import React from "react";
import PageSection from "@/components/PageSection/PageSection";
import Link from "next/link";
import AddCustomerSection from "@/components/AddCustomerSection/AddCustomerSection";

const AddCustomerPage = () => {
  return (
    <div className="pt-[106px] bg-gray-5 px-6">
      <PageSection className="w-full min-h-[calc(100vh-132px)] pt-8 pb-6 px-6">
        <div className="flex items-center gap-2 w-full justify-between pb-8">
          <h1 className="text-[32px] font-bold text-violent-80">
            Create New Customer
          </h1>
          <Link
            href="/catalog"
            className="text-xl font-semibold text-violent-60 underline underline-offset-1 decoration-1 text-end self-end"
          >
            Back To Catalog
          </Link>
        </div>
        <AddCustomerSection />
      </PageSection>
    </div>
  );
};

export default AddCustomerPage;
