"use client";

import React, { useState } from "react";
import PageSection from "@/components/PageSection/PageSection";
import CustomersList from "@/components/CustomersList/CustomersList";
import CustomersSearchSection from "@/components/CustomersSearchSection/CustomersSearchSection";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetCustomersQuery } from "@/store/services/customersApi";

const CustomersPage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data } = useGetCustomersQuery(
    debouncedSearch ? { name: debouncedSearch } : undefined,
  );

  return (
    <div className="pb-4 px-6 pt-[106px] min-h-screen bg-gray-5">
      <PageSection className="px-3 py-4 min-h-[calc(100vh-122px)] relative">
        <CustomersSearchSection
          search={search}
          setSearch={setSearch}
          customers={data?.items}
        />
        <CustomersList customers={data?.items} />
      </PageSection>
    </div>
  );
};

export default CustomersPage;
