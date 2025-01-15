import React, { useEffect, useRef } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import CustomFormLabel from "@/components/Forms/CustomFormLabel/CustomFormLabel";
import { Input } from "@/components/ui/input";
import { formatDecimalInput } from "@/lib/utils";
import { setPaid } from "@/store/slices/CartSlice/cartSlice";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { PaymentType } from "@/types/types";

interface PaymentAmountInputProps {
  type: PaymentType;
  name: string;
}

const PaymentAmountInput = ({ type, name }: PaymentAmountInputProps) => {
  const form = useFormContext();
  const dispatch = useDispatch();
  const { totalPrice, balanceDue, paid } = useSelector(
    (state: RootState) => state.cart,
  );
  const balanceDueRef = useRef(balanceDue);
  const prevAmount = useRef(0);
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.focus();
    }
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <CustomFormLabel
            label="Amount"
            className="text-2xl font-semibold block mb-6"
          />
          <FormControl>
            <Input
              {...field}
              ref={amountRef}
              autoComplete="off"
              placeholder="Enter amount"
              className="h-[50px] text-xl font-semibold py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40"
              onChange={(e) => {
                let value = formatDecimalInput(e.target.value);

                if (+value > totalPrice && type === "full") {
                  value = totalPrice?.toString();
                }

                const balanceDueBeforeUpdate =
                  balanceDue + +prevAmount?.current;

                if (+value > balanceDueBeforeUpdate && type === "split") {
                  value = (balanceDueRef?.current || "")?.toString();
                }

                const newPaid = +value + paid - prevAmount?.current;

                prevAmount.current = +value;

                field.onChange(value);
                dispatch(setPaid(newPaid));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PaymentAmountInput;
