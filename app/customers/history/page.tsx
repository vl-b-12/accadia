"use client";

import React, { useState } from "react";
import PageSection from "@/components/PageSection/PageSection";
import HistorySearchSection from "@/components/HistorySearchSection/HistorySearchSection";
import HistoryList from "@/components/HistoryList/HistoryList";
// import { useGetHistoryQuery } from "@/store/services/customersApi";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/storeTypes";

const HistoryPage = () => {
  const [selectedFilterOption, setSelectedFilterOption] = useState<
    string | null
  >(null);
  // const { selectedHistoryCustomer } = useSelector(
  //   (state: RootState) => state.customer,
  // );
  // const { data: history } = useGetHistoryQuery(
  //   selectedHistoryCustomer!.id.toString(),
  // );

  return (
    <div className="pb-4 px-6 pt-[106px] min-h-screen bg-gray-5">
      <PageSection className="px-3 py-4 min-h-[calc(100vh-122px)] relative">
        <HistorySearchSection
          selectedFilterOption={selectedFilterOption}
          setSelectedFilterOption={setSelectedFilterOption}
        />
        <HistoryList />
      </PageSection>
    </div>
  );
};

export default HistoryPage;
