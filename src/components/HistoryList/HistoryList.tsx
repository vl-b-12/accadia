import React, { ForwardedRef, forwardRef, useMemo, useState } from "react";
import { cn, formatPrice, handlePdfUpload } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CustomerHistoryResponse,
  GetDocumentLinksResponse,
  useLazyGetDocumentLinksQuery,
  useShareSmsMutation,
} from "@/store/services/customersApi";
import PaymentMethodsSections from "@/components/PaymentMethodsSection/PaymentMethodsSections";
import Image from "next/image";
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
    const [isDialogOpenIndex, setIsDialogOpenIndex] = useState(-1);
    const [selectOption, setSelectOption] = useState("");
    const { selectedHistoryCustomer } = useSelector(
      (state: RootState) => state.customer,
    );

    const [shareSms] = useShareSmsMutation();
    const [getDocumentLinks, { data }] = useLazyGetDocumentLinksQuery();

    const selectedOptionLink = useMemo(
      () => data?.find((option) => option.title === selectOption)?.url,
      [selectOption, data],
    );

    const isShareButtonDisabled = !selectOption;

    return (
      <div className="pt-6 px-6">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-base font-medium text-gray-70 border-b border-b-violent-30">
          <div className={cn(cellStyle)}>Order</div>
          <div className={cn(cellStyle)}>Purchase Day</div>
          <div className={cn(cellStyle)}>Payment Methods</div>
          <div className={cn(cellStyle)}>Total</div>
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
                      #{historyItem.docNo}{" "}
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
                      onClick={() => {
                        if (data?.length) {
                          const invoiceLink = data.find(
                            (link) => link.title === "Jewelry Invoice",
                          )?.url;

                          if (invoiceLink) {
                            handlePdfUpload(invoiceLink, "invoice.pdf");
                          }
                        }
                      }}
                    />

                    <Dialog
                      open={isDialogOpenIndex === id}
                      onOpenChange={async (isOpen) => {
                        setSelectOption("");
                        setIsDialogOpenIndex(isOpen ? id : -1);
                        const { data: sharingOptions } = await getDocumentLinks(
                          historyItem!.paymentId,
                        );
                        setSelectOption(sharingOptions?.[0].title ?? "");
                      }}
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
                            {data?.map(
                              (
                                documentLink: GetDocumentLinksResponse,
                                index: number,
                              ) => (
                                <SelectItem
                                  key={index}
                                  value={documentLink.title}
                                  hideCheckIcon
                                >
                                  {documentLink.title}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>

                        <div className="grid grid-cols-4 gap-3">
                          <ShareButton
                            disabled={isShareButtonDisabled}
                            text="Send Email"
                            icon="/icons/mail-icon.svg"
                            onClick={async () => {
                              if (selectedOptionLink) {
                                window.location.href = `mailto:?body=${encodeURIComponent(selectedOptionLink)}`;
                              }
                              setIsDialogOpenIndex(-1);
                            }}
                          />

                          <ShareButton
                            text="Copy URL"
                            icon="/icons/globe-icon.svg"
                            disabled={isShareButtonDisabled}
                            onClick={async () => {
                              if (selectedOptionLink) {
                                try {
                                  await navigator.clipboard.writeText(
                                    selectedOptionLink,
                                  );
                                } catch (err) {
                                  console.error("Clipboard copy error:", err);
                                }
                              }
                              setIsDialogOpenIndex(-1);
                            }}
                          />

                          <ShareButton
                            text="Preview"
                            icon="/icons/preview-icon.svg"
                            disabled={isShareButtonDisabled}
                            onClick={async () => {
                              if (selectedOptionLink) {
                                window.open(
                                  selectedOptionLink,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
                              }
                            }}
                          />
                          <ShareButton
                            text="Send SMS"
                            icon="/icons/send-icon.svg"
                            disabled={isShareButtonDisabled}
                            onClick={async () => {
                              if (
                                selectedHistoryCustomer?.phoneNumber &&
                                selectedOptionLink
                              ) {
                                await shareSms({
                                  phoneTo: selectedHistoryCustomer.phoneNumber,
                                  messageBody: `Download invoice from ${selectedOptionLink}`,
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
                          onClick={() => {
                            if (data?.length) {
                              const invoiceLink = data?.find(
                                (link) =>
                                  link.title === "POS Certificate of Appraisal",
                              )?.url;

                              if (invoiceLink) {
                                handlePdfUpload(invoiceLink, "invoice.pdf");
                              }
                            }
                          }}
                        >
                          {item.sku} {item.name}
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
