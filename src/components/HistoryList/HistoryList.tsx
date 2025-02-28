import React, { ForwardedRef, forwardRef, useState } from "react";
import { cn, FetchFunction, formatPrice, handlePdfUpload } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CustomerHistoryResponse,
  useShareSmsMutation,
} from "@/store/services/customersApi";
import PaymentMethodsSections from "@/components/PaymentMethodsSection/PaymentMethodsSections";
import Image from "next/image";
import { useLazyGetInvoiceQuery } from "@/store/services/paymentsApi";
import { useLazyGetCertificateQuery } from "@/store/services/productsApi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShareButton from "@/components/ShareButton/ShareButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";

interface HistoryListProps {
  history: CustomerHistoryResponse[];
}

const cellStyle = "px-6 py-3";

const HistoryList = forwardRef(
  ({ history }: HistoryListProps, ref: ForwardedRef<HTMLDivElement | null>) => {
    const [selectOption, setSelectOption] = useState("");
    const [isDialogOpenIndex, setIsDialogOpenIndex] = useState(-1);
    const { selectedCustomer } = useSelector(
      (state: RootState) => state.customer,
    );

    const [getInvoice] = useLazyGetInvoiceQuery();
    const [getCertificate] = useLazyGetCertificateQuery();
    const [shareSms] = useShareSmsMutation();

    console.log(selectedCustomer, "selectedCustomer");

    return (
      <div className="pt-6 px-6">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-base font-medium text-gray-70 border-b border-b-violent-30">
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
                key={`${historyItem.paymentId}_${id}`}
                type="multiple"
                ref={isLastHistoryItem ? ref : null}
              >
                <AccordionItem
                  value={historyItem.paymentId.toString()}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 border-b border-b-[#DBDADE] pt-6 hover:bg-violent-20 duration-300"
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
                    {new Date(historyItem.purchaseDate).toLocaleDateString()}
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
                  <div className={cn("flex gap-6", cellStyle)}>
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

                    <Dialog
                      open={isDialogOpenIndex === id}
                      onOpenChange={(isOpen) =>
                        setIsDialogOpenIndex(isOpen ? id : -1)
                      }
                    >
                      <DialogTrigger>
                        <Image
                          src="/icons/share-icon.svg"
                          width={24}
                          height={24}
                          alt="download icon"
                          unoptimized
                          className={cn("cursor-pointer")}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-[576px] p-6 pt-16 flex flex-col gap-6">
                        <DialogTitle className="text-xl font-bold text-violent-80 text-center">
                          Share
                        </DialogTitle>
                        <Select
                          onValueChange={setSelectOption}
                          value={selectOption}
                        >
                          <SelectTrigger className="w-full border border-violent-40 text-violent-30 focus:outline-none focus:ring-0">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="invoice" hideCheckIcon>
                              Jewelry Invoice
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="grid grid-cols-3 gap-3">
                          <ShareButton
                            text="Send Email"
                            icon="/icons/mail-icon.svg"
                            onClick={async () => {
                              await handlePdfUpload(
                                getInvoice as FetchFunction,
                                historyItem.paymentId.toString(),
                                "invoice",
                                "copy",
                              );

                              const link = await navigator.clipboard.readText();
                              window.location.href = `mailto:?body=${encodeURIComponent(link)}`;

                              setIsDialogOpenIndex(-1);
                            }}
                          />

                          <ShareButton
                            text="Copy URL"
                            icon="/icons/globe-icon.svg"
                            onClick={() => {
                              handlePdfUpload(
                                getInvoice as FetchFunction,
                                historyItem.paymentId.toString(),
                                "invoice",
                                "copy",
                              );

                              setIsDialogOpenIndex(-1);
                            }}
                          />
                          <ShareButton
                            text="Send SMS"
                            icon="/icons/send-icon.svg"
                            onClick={async () => {
                              handlePdfUpload(
                                getInvoice as FetchFunction,
                                historyItem.paymentId.toString(),
                                "invoice",
                                "copy",
                              );

                              const link = await navigator.clipboard.readText();

                              if (selectedCustomer?.phoneNumber) {
                                await shareSms({
                                  phoneTo: selectedCustomer.phoneNumber,
                                  messageBody: `Download invoice from ${link}`,
                                });
                              }

                              setIsDialogOpenIndex(-1);
                            }}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <AccordionContent className={cn(cellStyle)}>
                    <div className="flex flex-col gap-2.5">
                      {historyItem.products.map((item, id) => (
                        <div
                          key={`${item.sku}_${id}`}
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
