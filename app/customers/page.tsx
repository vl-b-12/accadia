"use client";

import React, { useEffect, useRef, useState } from "react";
import PageSection from "@/components/PageSection/PageSection";
import CustomersList from "@/components/CustomersList/CustomersList";
import CustomersSearchSection from "@/components/CustomersSearchSection/CustomersSearchSection";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetCustomersQuery } from "@/store/services/customersApi";
import { Customer } from "@/types/types";

const CustomersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const lastCustomerItemRef = useRef<HTMLDivElement | null>(null);
  const [customersToShow, setCustomersToShow] = useState<Customer[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  const { data: customers } = useGetCustomersQuery({
    ...(debouncedSearch ? { name: debouncedSearch } : {}),
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (customers?.items) {
      if (customers?.page > 1) {
        setCustomersToShow((prevCustomers) => [
          ...prevCustomers,
          ...customers.items,
        ]);
      } else {
        setCustomersToShow(customers.items);
      }
    }
  }, [customers?.page, customers?.items]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && customers?.hasNextPage) {
        setPage((prev) => prev + 1);
      }
    });

    const currentRef = lastCustomerItemRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [customers?.hasNextPage, customersToShow]);

  return (
    <div className="pb-4 px-6 pt-[106px] min-h-screen bg-gray-5">
      <PageSection className="px-3 py-4 min-h-[calc(100vh-122px)] relative">
        <CustomersSearchSection
          search={search}
          setSearch={setSearch}
          customers={customersToShow}
        />
        <CustomersList customers={customersToShow} ref={lastCustomerItemRef} />
      </PageSection>
    </div>
  );
};

export default CustomersPage;
