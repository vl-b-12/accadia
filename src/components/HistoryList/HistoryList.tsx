import React from "react";
import { cn } from "@/lib/utils";
import { mockHistory } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cellStyle = "px-6 py-3";

const HistoryList = () => {
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
        {mockHistory.map((historyItem) => (
          <Accordion key={historyItem.paymentId} type="multiple">
            <AccordionItem
              value={historyItem.paymentId.toString()}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-2 border-b border-b-[#DBDADE] pt-6 hover:bg-violent-20 duration-300"
            >
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>
              <div>test</div>

              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
