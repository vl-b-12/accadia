import React, { ForwardedRef, forwardRef } from "react";
import { cn, FetchFunction, formatPrice, handlePdfUpload } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomerHistoryResponse } from "@/store/services/customersApi";
import { format } from "date-fns";
import PaymentMethodsSections from "@/components/PaymentMethodsSection/PaymentMethodsSections";
import Image from "next/image";
import { useLazyGetInvoiceQuery } from "@/store/services/paymentsApi";
import { useLazyGetCertificateQuery } from "@/store/services/productsApi";

interface HistoryListProps {
  history: CustomerHistoryResponse[];
}

const cellStyle = "px-6 py-3";

const HistoryList = forwardRef(
  ({ history }: HistoryListProps, ref: ForwardedRef<HTMLDivElement | null>) => {
    const [getInvoice] = useLazyGetInvoiceQuery();
    const [getCertificate] = useLazyGetCertificateQuery();

    return (
      <div className="pt-6 px-6">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-2 text-base font-medium text-gray-70 border-b border-b-violent-30">
          <div className={cn(cellStyle)}>Order</div>
          <div className={cn(cellStyle)}>Purchase Day</div>
          <div className={cn(cellStyle)}>Payment Methods</div>
          <div className={cn(cellStyle)}>Price</div>
          <div className={cn(cellStyle)}>Taxes</div>
          <div className={cn(cellStyle)}>Actions</div>
        </div>
        <div className="w-full h-[calc(100vh-358px)] overflow-y-auto text-base font-medium text-black">
          {history.map((historyItem, id) => {
            const isLastHistoryItem = id === history.length - 1;

            const { currencySymbol, price } = formatPrice(
              historyItem.price.toString(),
            );
            const { price: tax } = formatPrice(historyItem.taxes.toString());

            return (
              <Accordion
                key={historyItem.paymentId}
                type="multiple"
                ref={isLastHistoryItem ? ref : null}
              >
                <AccordionItem
                  value={historyItem.paymentId.toString()}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-2 border-b border-b-[#DBDADE] pt-6 hover:bg-violent-20 duration-300"
                >
                  <AccordionTrigger className={cn(cellStyle)}>
                    <div className="font-medium">
                      #{historyItem.paymentId}{" "}
                      <span className="text-gray-70 text-sm pl-2.5 text-nowrap">
                        {historyItem.products.length} items
                      </span>
                    </div>
                  </AccordionTrigger>
                  <div className={cn(cellStyle)}>
                    {format(historyItem.purchaseDate, "dd.MM.yyyy")}
                  </div>
                  <div className={cn(cellStyle)}>
                    <PaymentMethodsSections
                      card={historyItem.userCreditCardPayment}
                      cash={historyItem.useCashPayment}
                      check={historyItem.useCheckPayment}
                      wireTransfer={historyItem.useWirePayment}
                    />
                  </div>
                  <div className={cn(cellStyle)}>
                    {currencySymbol}
                    {price}
                  </div>
                  <div className={cn(cellStyle)}>
                    {currencySymbol}
                    {tax}
                  </div>
                  <div className={cn(cellStyle)}>
                    <Image
                      src="/icons/download-icon.svg"
                      width={24}
                      height={24}
                      alt="download icon"
                      unoptimized
                      className={cn("cursor-pointer")}
                      onClick={() =>
                        handlePdfUpload(
                          getInvoice as FetchFunction,
                          historyItem.paymentId.toString(),
                          "invoice",
                        )
                      }
                    />
                  </div>

                  <AccordionContent className={cn(cellStyle)}>
                    <div className="flex flex-col gap-2.5">
                      {historyItem.products.map((item) => (
                        <div
                          key={item.sku}
                          className="text-base font-medium underline cursor-pointer"
                          onClick={() =>
                            handlePdfUpload(
                              getCertificate as FetchFunction,
                              item.sku,
                              "certificate",
                            )
                          }
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </div>
    );
  },
);

HistoryList.displayName = "HistoryList";

export default HistoryList;
