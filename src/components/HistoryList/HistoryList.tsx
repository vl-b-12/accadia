import React from "react";
import { cn, formatPrice } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomerHistoryResponse } from "@/store/services/customersApi";
import { format } from "date-fns";
import PaymentMethodsSections from "@/components/PaymentMethodsSection/PaymentMethodsSections";

interface HistoryListProps {
  history: CustomerHistoryResponse[];
}

const cellStyle = "px-6 py-3";

const HistoryList = ({ history }: HistoryListProps) => {
  return (
    <div className="pt-6 px-6">
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-base font-medium text-gray-70 border-b border-b-violent-30">
        <div className={cn(cellStyle)}>Order</div>
        <div className={cn(cellStyle)}>Purchase Day</div>
        <div className={cn(cellStyle)}>Payment Methods</div>
        <div className={cn(cellStyle)}>Price</div>
        <div className={cn(cellStyle)}>Taxes</div>
        <div className={cn(cellStyle)}>Actions</div>
      </div>
      <div className="w-full h-[calc(100vh-358px)] overflow-y-auto text-base font-medium text-black">
        {history.map((historyItem) => {
          const { currencySymbol, price } = formatPrice(
            historyItem.price.toString(),
          );
          const { price: tax } = formatPrice(historyItem.taxes.toString());

          return (
            <Accordion key={historyItem.paymentId} type="multiple">
              <AccordionItem
                value={historyItem.paymentId.toString()}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-2 border-b border-b-[#DBDADE] pt-6 hover:bg-violent-20 duration-300"
              >
                <AccordionTrigger className={cn(cellStyle)}>
                  <div className="font-medium">
                    #{historyItem.paymentId}{" "}
                    <span className="text-gray-70 text-sm pl-2.5">
                      {historyItem.products.length} items
                    </span>
                  </div>
                </AccordionTrigger>
                <div className={cn(cellStyle)}>
                  {format(historyItem.purchaseDate, "dd.MM.yyyy")}
                </div>
                <div className={cn(cellStyle)}>
                  <PaymentMethodsSections />
                </div>
                <div className={cn(cellStyle)}>
                  {currencySymbol}
                  {price}
                </div>
                <div className={cn(cellStyle)}>
                  {currencySymbol}
                  {tax}
                </div>
                <div className={cn(cellStyle)}>test</div>

                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;
