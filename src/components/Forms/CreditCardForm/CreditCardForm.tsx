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
import { PaymentType } from "@/types/types";
import PaymentAmountInput from "@/components/Forms/PaymentAmountInput/PaymentAmountInput";

interface CreditCardFormProps {
  type: PaymentType;
}

const CreditCardForm = ({ type }: CreditCardFormProps) => {
  const form = useFormContext();

  return (
    <div className="mb-8">
      <PaymentAmountInput type={type} name="creditCardAmount" />

      <CustomFormLabel
        label="Cart Details"
        className="text-2xl font-semibold block my-6"
        isRequired
      />

      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="last4Digits"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Insert Last 4 Digits"
                  className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(value.slice(0, 4));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cardholder Name"
                  className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Bank Name"
                  className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CreditCardForm;
