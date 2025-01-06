"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import SelectCustomerForm from "@/components/Forms/SelectCustomerForm/SelectCustomerForm";
import ProceedToPaymentForm from "@/components/Forms/ProceedToPaymentForm/ProceedToPaymentForm";
import Image from "next/image";
import { clearSelectedCustomer } from "@/store/slices/CustomerSlice/customerslice";

interface SelectCustomerProps {
  step: number;
  setStep: (step: number) => void;
}

const SelectCustomer = ({ step, setStep }: SelectCustomerProps) => {
  const { selectedCustomer } = useSelector(
    (state: RootState) => state.customer,
  );

  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      name: "",
      discount: 0,
      amount: 0,
      tax: 0,
    },
  });

  return (
    <>
      <Form {...form}>
        {step === 1 && <SelectCustomerForm setStep={setStep} />}
        {step === 2 && (
          <>
            <ProceedToPaymentForm />
            {!!selectedCustomer && (
              <div className="flex gap-1 justify-between p-4 rounded-md bg-violent-10">
                <div className="flex items-center gap-4">
                  <Image
                    src="/icons/customer-icon.svg"
                    alt="customer icon"
                    width={16}
                    height={16}
                  />
                  <div className="text-base font-medium">
                    {selectedCustomer?.name}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Image
                    src="/icons/edit-icon.svg"
                    alt="flag icon"
                    width={20}
                    height={20}
                    onClick={() => {
                      dispatch(clearSelectedCustomer());
                      setStep(1);
                      form.resetField("name");
                    }}
                    className="cursor-pointer"
                  />
                  <Image
                    src="/icons/gb-flag-icon.svg"
                    alt="flag icon"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </Form>
    </>
  );
};

export default SelectCustomer;
