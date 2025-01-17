"use client";

import React from "react";
import { Customer } from "@/types/types";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setSelectedHistoryCustomer } from "@/store/slices/CustomerSlice/customerSlice";
import { useRouter } from "next/navigation";

interface CustomersListProps {
  customers?: Customer[];
}

const cellStyle = "px-6 py-3";

const CustomersList = ({ customers }: CustomersListProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="pt-6 px-6">
      <div className="grid grid-cols-[2fr_2fr_2fr_2fr_1fr] gap-2 text-base font-medium text-gray-70 border-b border-b-violent-30">
        <div className={cn(cellStyle)}>Name</div>
        <div className={cn(cellStyle)}>Address</div>
        <div className={cn(cellStyle)}>Phone Number</div>
        <div className={cn(cellStyle)}>Date Of Birthday</div>
        <div className={cn(cellStyle)}>History</div>
      </div>
      <div className="w-full h-[calc(100vh-358px)] overflow-y-auto text-base font-medium text-black">
        {customers?.map((customer) => (
          <div
            key={customer.id}
            className="grid gap-2 grid-cols-[2fr_2fr_2fr_2fr_1fr] border-b border-b-[#DBDADE] pt-6 hover:bg-violent-20 duration-300"
          >
            <div className={cn(cellStyle)}>
              <div>{`${customer.firstName} ${customer.lastName}`}</div>
              <div className="text-gray-70 w-[200px] truncate">
                {customer.email}
              </div>
            </div>

            <div className={cn(cellStyle)}>
              {[customer.country, customer.state, customer.city]
                .filter(Boolean)
                .join(", ")}
            </div>
            <div className={cn(cellStyle)}>
              {customer.phoneNumber || "+12(312)312-31-23"}
            </div>
            <div className={cn(cellStyle)}>{customer.dob.split(" ")[0]}</div>

            <div
              className={cn("cursor-pointer", cellStyle)}
              onClick={() => {
                // if (customer.hasPayments) {
                //   dispatch(setSelectedHistoryCustomer(customer));
                //   push("/customers/history");
                // }
                //TODO enable after history is implemented on BE

                dispatch(setSelectedHistoryCustomer(customer));
                push("/customers/history");
              }}
            >
              <svg
                width="18"
                height="24"
                viewBox="0 0 18 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("text-violent-40", {
                  "text-gray-25": !customer.hasPayments,
                })}
              >
                <path
                  d="M15 22.5H3C2.17031 22.5 1.5 21.8297 1.5 21V3C1.5 2.17031 2.17031 1.5 3 1.5H9V6.75C9 7.99219 10.0078 9 11.25 9H16.5V21C16.5 21.8297 15.8297 22.5 15 22.5ZM11.25 7.5C10.8375 7.5 10.5 7.1625 10.5 6.75V1.52344C10.6313 1.55625 10.7531 1.62188 10.8469 1.72031L16.2797 7.15313C16.3781 7.25156 16.4438 7.36875 16.4766 7.5H11.25ZM3 0C1.34531 0 0 1.34531 0 3V21C0 22.6547 1.34531 24 3 24H15C16.6547 24 18 22.6547 18 21V7.68281C18 7.0875 17.7609 6.51562 17.3391 6.09375L11.9109 0.660938C11.4891 0.239063 10.9172 0 10.3219 0H3ZM5.25 12C4.8375 12 4.5 12.3375 4.5 12.75C4.5 13.1625 4.8375 13.5 5.25 13.5H12.75C13.1625 13.5 13.5 13.1625 13.5 12.75C13.5 12.3375 13.1625 12 12.75 12H5.25ZM5.25 15C4.8375 15 4.5 15.3375 4.5 15.75C4.5 16.1625 4.8375 16.5 5.25 16.5H12.75C13.1625 16.5 13.5 16.1625 13.5 15.75C13.5 15.3375 13.1625 15 12.75 15H5.25ZM5.25 18C4.8375 18 4.5 18.3375 4.5 18.75C4.5 19.1625 4.8375 19.5 5.25 19.5H12.75C13.1625 19.5 13.5 19.1625 13.5 18.75C13.5 18.3375 13.1625 18 12.75 18H5.25Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersList;
