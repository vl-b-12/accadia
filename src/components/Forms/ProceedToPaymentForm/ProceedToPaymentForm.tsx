import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/store/slices/CartSlice/cartSlice";
import { formatPrice } from "@/lib/utils";

const ProceedToPaymentForm = () => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState<"discount" | "amount" | null>(
    null,
  );
  const [isInputChanged, setIsInputChanged] = useState(false);
  const { totalPrice } = useSelector((state: RootState) => state.cart);
  const form = useFormContext();
  const discount = form.watch("discount");
  const amount = form.watch("amount");
  const tax = form.watch("tax");

  const { currencySymbol, price } = formatPrice(totalPrice);

  const handleSubmit: SubmitHandler<FieldValues> = (_, e) => {
    e?.preventDefault();
  };

  const numberInputValidator = ({
    e,
    field,
    max = 100,
    min = 0,
    changed,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    field: ControllerRenderProps;
    max?: number;
    min?: number;
    changed?: boolean;
  }) => {
    let value = e.target.value;

    if (value !== "0") {
      value = value.replace(/^0+/, "");
    }

    const numericValue = Math.max(min, Math.min(Number(value) || min, max));
    field.onChange(value === "" ? min.toString() : numericValue.toString());

    if (changed) {
      setIsInputChanged(true);
    }
  };

  const taxInputValidator = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
    min = 0,
  ) => {
    let value = e.target.value;

    if (value !== "0") {
      value = value.replace(/^0+/, "");
    }

    const numericValue = Math.max(min, Math.min(Number(value) || min));
    field.onChange(value === "" ? min.toString() : numericValue.toString());
  };

  useEffect(() => {
    if (isUpdating !== "amount" && discount && isInputChanged) {
      setIsUpdating("discount");
      const calculatedAmount = (Number(discount) / 100) * totalPrice;
      const finalAmount = Number.isInteger(calculatedAmount)
        ? calculatedAmount.toString()
        : calculatedAmount.toFixed(2);

      form.setValue("amount", finalAmount);
      setIsUpdating(null);
      setIsInputChanged(false);
    }
  }, [discount, totalPrice, form.setValue, isUpdating]);

  useEffect(() => {
    if (isUpdating !== "discount" && amount && isInputChanged) {
      setIsUpdating("amount");
      const calculatedDiscount = (Number(amount) / totalPrice) * 100;
      const finalDiscount = Number.isInteger(calculatedDiscount)
        ? calculatedDiscount.toString()
        : calculatedDiscount.toFixed(2);

      form.setValue("discount", finalDiscount);
      setIsUpdating(null);
      setIsInputChanged(false);
    }
  }, [amount, totalPrice, form.setValue, isUpdating]);

  const grandTotal = useMemo(() => {
    let total = totalPrice;
    if (amount) {
      total -= Number(amount);
    }
    if (tax) {
      total += Number(tax);
    }
    return total;
  }, [totalPrice, amount, tax]);

  return (
    <form
      className="flex flex-col bg-violent-10 rounded-md px-4 pb-4"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="flex gap-1 justify-between pt-8 pb-1.5">
        <div className="font-medium">Subtotal ({currencySymbol})</div>
        <div className="text-xl font-semibold">
          <span className="font-light">{currencySymbol}</span>
          {price}
        </div>
      </div>
      <div className="flex gap-1 justify-between py-1.5 flex-wrap xl:flex-nowrap">
        <div className="flex items-center gap-2 w-full justify-between xl:justify-start">
          <div className="text-sm">Discount (%)</div>
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="h-9 w-[80px] border-violent-40 px-4 text-xl font-medium"
                    onChange={(e) =>
                      numberInputValidator({ e, field, changed: true })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-2 w-full justify-between xl:justify-end">
          <div className="text-sm">Amount</div>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-9 w-[104px] border-violent-40 px-4 text-xl font-medium"
                    onChange={(e) =>
                      numberInputValidator({
                        e,
                        field,
                        max: totalPrice,
                        changed: true,
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex items-center gap-1 justify-between py-1.5">
        <div className="text-sm">Tax</div>
        <FormField
          control={form.control}
          name="tax"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="h-9 w-[104px] border-violent-40 px-4 text-xl font-medium"
                  onChange={(e) => taxInputValidator(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center gap-1 justify-between pt-1.5 pb-4">
        <div className="text-base font-medium">Grand Total:</div>
        <div className="text-[28px] font-bold">
          <span className="font-light">{currencySymbol}</span>
          {grandTotal.toFixed(2)}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="primary" className="h-14 uppercase">
          Proceed
        </Button>
        <Button
          variant="outline"
          className="h-14 uppercase font-bold text-base border-violent-90 opacity-30 text-violent-90 hover:opacity-50"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </Button>
      </div>
    </form>
  );
};

export default ProceedToPaymentForm;
