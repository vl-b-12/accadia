"use client";

import React, { ReactElement, useState } from "react";
import FormNavigation from "@/components/FormNavigation/FormNavigation";
import { addCustomerNavConfig } from "@/constants";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AccountForm from "@/components/Forms/AccountForm/AccountForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addCustomerSchemaAccount,
  addCustomerSchemaMailing,
  addCustomerSchemaPersonal,
  addCustomerSchemaShipping,
} from "@/schemas/addCustomerSchema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import MailingForm from "@/components/Forms/MailingForm/MailingForm";
import ShippingForm from "@/components/Forms/ShippingForm/ShippingForm";
import PersonalForm from "@/components/Forms/PersonalForm/PersonalForm";
import { useDispatch } from "react-redux";
import { addCustomer } from "@/store/slices/CustomerSlice/customerslice";

const addCustomerSchemas: { [key: number]: z.ZodSchema } = {
  1: addCustomerSchemaAccount,
  2: addCustomerSchemaMailing,
  3: addCustomerSchemaShipping,
  4: addCustomerSchemaPersonal,
};

const addCustomerDefaultValues = {
  1: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  2: {
    street1: "",
    street2: "",
    state: "",
    city: "",
    zip: "",
    country: "",
  },
  3: {
    shippingStreet1: "",
    shippingStreet2: "",
    shippingState: "",
    shippingCity: "",
    shippingZip: "",
    shippingCountry: "",
  },
  4: {
    birthday: "",
    anniversary: "",
    spouse: "",
    nationality: "",
  },
};

const addCustomerFormConfig: { [key: number]: ReactElement } = {
  1: <AccountForm />,
  2: <MailingForm />,
  3: <ShippingForm />,
  4: <PersonalForm />,
};

const AddCustomerSection = () => {
  const [step, setStep] = useState(1);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(addCustomerSchemas[step]),
    defaultValues: addCustomerDefaultValues[step],
  });

  const handleSubmit: SubmitHandler<FieldValues> = (_, e) => {
    e?.preventDefault();

    if (step !== 4) {
      setStep((prev) => prev + 1);
    } else {
      const { firstName, lastName } = form.getValues();
      dispatch(addCustomer({ name: `${firstName} ${lastName}` }));
      push("/cart");
    }
  };

  return (
    <div>
      <FormNavigation step={step} navConfig={addCustomerNavConfig} />
      <Form {...form}>
        <form
          className="w-full pt-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col gap-6 w-[475px] mb-6">
            {addCustomerFormConfig[step]}
          </div>

          <div className="flex gap-6 justify-end">
            {step !== 4 ? (
              <>
                <Button
                  variant="outline"
                  className="h-14 w-56 uppercase font-bold text-base border-violent-30 text-gray-70 hover:bg-violent-20 duration-300"
                  onClick={() => {
                    if (step === 1) {
                      push("cart");
                    } else {
                      setStep(step - 1);
                    }
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  className="h-14 uppercase w-56"
                  type="submit"
                >
                  Next
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                className="h-[52px] uppercase w-[475px]"
                type="submit"
              >
                Add New Customer
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCustomerSection;
