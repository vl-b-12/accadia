"use client";

import React, { useEffect, useRef, useState } from "react";
import PageSection from "@/components/PageSection/PageSection";
import HistorySearchSection from "@/components/HistorySearchSection/HistorySearchSection";
import HistoryList from "@/components/HistoryList/HistoryList";
import {
  CustomerHistoryResponse,
  useGetHistoryQuery,
} from "@/store/services/customersApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const lastHistoryItemRef = useRef<HTMLDivElement | null>(null);
  const [historyToShow, setHistoryToShow] = useState<CustomerHistoryResponse[]>(
    [],
  );
  const [selectedFilterOption, setSelectedFilterOption] = useState<
    string | null
  >(null);
  const { selectedHistoryCustomer } = useSelector(
    (state: RootState) => state.customer,
  );
  const { data: history } = useGetHistoryQuery({
    customerId: selectedHistoryCustomer!.id.toString(),
    page,
    sort,
  });

  console.log(history, "history");

  useEffect(() => {
    if (history?.items) {
      if (history?.page > 1) {
        setHistoryToShow((prevHistory) => [...prevHistory, ...history?.items]);
      } else {
        setHistoryToShow(history?.items);
      }
    }
  }, [history?.page, history?.items]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && history?.hasNextPage) {
        setPage((prev) => prev + 1);
      }

      const currentRef = lastHistoryItemRef.current;

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    });
  }, [history?.hasNextPage, historyToShow]);

  return (
    <div className="pb-4 px-6 pt-[106px] min-h-screen bg-gray-5">
      <PageSection className="px-3 py-4 min-h-[calc(100vh-122px)] relative">
        <HistorySearchSection
          selectedFilterOption={selectedFilterOption}
          setSelectedFilterOption={setSelectedFilterOption}
        />
        <HistoryList history={historyToShow} />
      </PageSection>
    </div>
  );
};

export default HistoryPage;
