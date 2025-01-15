import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  clearSelectedCustomer,
  selectCustomer,
} from "@/store/slices/CustomerSlice/customerSlice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { useRouter } from "next/navigation";
import { useGetCustomersQuery } from "@/store/services/customersApi";

interface SelectCustomerFormProps {
  setStep: (step: number) => void;
}

const SelectCustomerForm = ({ setStep }: SelectCustomerFormProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { selectedCustomer } = useSelector(
    (state: RootState) => state.customer,
  );

  const { data: customers } = useGetCustomersQuery();

  const form = useFormContext();
  const customerQuery = form.watch("fullName");

  const customersToShow = customers?.filter((customer) =>
    customer.fullName?.toLowerCase().includes(customerQuery?.toLowerCase()),
  );

  const handleSubmit: SubmitHandler<FieldValues> = (_, e) => {
    e?.preventDefault();
    setStep(2);
  };

  return (
    <form
      className="relative flex flex-col gap-4 p-4 bg-violent-10 rounded-md"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="flex gap-2.5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="relative grow">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Find Customer"
                  className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
                  onChange={(e) => {
                    field.onChange(e);
                    if (selectedCustomer) {
                      dispatch(clearSelectedCustomer());
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
              {!!selectedCustomer && (
                <Image
                  className="absolute top-2 right-4 cursor-pointer"
                  src="/icons/clear-icon.svg"
                  alt="Clear Icon"
                  width={16}
                  height={16}
                  onClick={() => {
                    dispatch(clearSelectedCustomer());
                    form.resetField("fullName");
                  }}
                />
              )}
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="add"
          size="responsive"
          className="w-[120px] text-violent-90 hover:bg-gray-10 duration-300"
          onClick={() => push("/add-customer")}
        >
          <span className="size-3 flex justify-center items-center">+</span>
          Add New
        </Button>
      </div>
      <Button
        variant="primary"
        className="h-14 uppercase"
        disabled={!selectedCustomer}
      >
        Proceed
      </Button>
      {customerQuery && !!customersToShow?.length && !selectedCustomer && (
        <ul className="absolute top-20 left-4 flex flex-col gap-2.5 w-[calc(100%-32px)] py-2 px-4 border border-violent-30 bg-white rounded-md">
          {customersToShow?.map((customer) => (
            <li
              key={customer.id}
              className="px-1.5 py-0.5 font-medium text-gray-70 hover:bg-violent-20 hover:rounded-md cursor-pointer duration-300"
              onClick={() => {
                form.setValue("fullName", customer.fullName);
                dispatch(selectCustomer(customer));
              }}
            >
              {customer.fullName}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SelectCustomerForm;
