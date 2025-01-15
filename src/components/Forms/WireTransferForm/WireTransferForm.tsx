import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CustomFormLabel from "@/components/Forms/CustomFormLabel/CustomFormLabel";
import { Input } from "@/components/ui/input";
import PaymentAmountInput from "@/components/Forms/PaymentAmountInput/PaymentAmountInput";
import { PaymentType } from "@/types/types";

interface CustomFormInputProps {
  type: PaymentType;
}

const WireTransferForm = ({ type }: CustomFormInputProps) => {
  const form = useFormContext();

  return (
    <>
      <PaymentAmountInput type={type} name="wireTransferAmount" />

      <CustomFormLabel
        label="Wire Transfer Details"
        className="text-2xl font-semibold block mt-6 mb-1.5"
        isRequired
      />

      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="wireTransferBankNameAndNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Bank Name / Number"
                  className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wireTransferAccountNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Account Number"
                  className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wireTransferReferenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Reference Number"
                  className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wireTransferDueDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Due Date"
                  className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40 mb-8"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default WireTransferForm;
