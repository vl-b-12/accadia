import React, { ChangeEvent } from "react";
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
  const { totalPrice } = useSelector((state: RootState) => state.cart);
  const form = useFormContext();
  const discount = form.watch("discount");
  const amount = form.watch("amount");
  const tax = form.watch("tax");

  const { currencySymbol, price } = formatPrice(totalPrice);

  //TODO update calculations

  // const calculateGrandTotal = () => {
  //   let grandTotal = totalPrice;
  //
  //   if (discount) {
  //     const discountAmount = (discount / 100) * totalPrice;
  //     grandTotal -= discountAmount;
  //     form.setValue("amount", discountAmount);
  //   }
  //
  //   if (amount) {
  //     const discountPercentage = (amount / totalPrice) * 100;
  //     grandTotal = totalPrice - amount;
  //     form.setValue("discount", discountPercentage);
  //   }
  //
  //   if (tax) {
  //     grandTotal += tax;
  //   }
  //
  //   return grandTotal;
  // };

  // const { price: finalPrice } = formatPrice(calculateGrandTotal());

  const handleSubmit: SubmitHandler<FieldValues> = (_, e) => {
    e?.preventDefault();
  };

  const numberInputValidator = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
    max = 100,
    min = 0,
  ) => {
    let value = e.target.value;

    if (value !== "0") {
      value = value.replace(/^0+/, "");
    }

    const numericValue = Math.max(min, Math.min(Number(value) || min, max));

    field.onChange(value === "" ? min.toString() : numericValue.toString());
  };

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
                    className="h-9 w-[74px] border-violent-40 px-4 text-xl font-medium"
                    onChange={(e) => numberInputValidator(e, field)}
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
                    onChange={(e) => numberInputValidator(e, field, totalPrice)}
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
                  onChange={(e) => numberInputValidator(e, field)}
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
          {"3000"}
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
