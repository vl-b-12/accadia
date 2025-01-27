"use client";

import React, { ReactElement, useEffect, useState } from "react";
import FormNavigation from "@/components/FormNavigation/FormNavigation";
import { addCustomerNavConfig } from "@/constants";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AccountForm from "@/components/Forms/AccountForm/AccountForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addCustomerSchemaAccount,
  addCustomerSchemaBilling,
  addCustomerSchemaPersonal,
  addCustomerSchemaShipping,
} from "@/schemas/addCustomerSchema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BillingForm from "@/components/Forms/BillingForm/BillingForm";
import ShippingForm from "@/components/Forms/ShippingForm/ShippingForm";
import PersonalForm from "@/components/Forms/PersonalForm/PersonalForm";
import { useDispatch } from "react-redux";
import { selectCustomer } from "@/store/slices/CustomerSlice/customerSlice";
import { useCreateCustomerMutation } from "@/store/services/customersApi";

const addCustomerSchemas: { [key: number]: z.ZodSchema } = {
  1: addCustomerSchemaAccount,
  2: addCustomerSchemaBilling,
  3: addCustomerSchemaShipping,
  4: addCustomerSchemaPersonal,
};

const addCustomerDefaultValues: { [key: number]: { [key: string]: string } } = {
  1: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
  2: {
    street1: "",
    street2: "",
    state: "",
    city: "",
    zipCode: "",
    country: "",
  },
  3: {
    shippingStreet1: "",
    shippingStreet2: "",
    shippingState: "",
    shippingCity: "",
    shippingZipCode: "",
    shippingCountry: "",
  },
  4: {
    birthDay: "",
    anniversary: "",
    spouse: "",
    nationality: "",
  },
};

const addCustomerFormConfig: { [key: number]: ReactElement } = {
  1: <AccountForm />,
  2: <BillingForm />,
  3: <ShippingForm />,
  4: <PersonalForm />,
};

const AddCustomerSection = () => {
  const [step, setStep] = useState(4);
  const [fulfilledSteps, setFulfilledSteps] = useState(0);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [createCustomer] = useCreateCustomerMutation();

  const form = useForm({
    resolver: zodResolver(addCustomerSchemas[step]),
    defaultValues: addCustomerDefaultValues[step],
  });

  const handleSubmit: SubmitHandler<FieldValues> = async (_, e) => {
    e?.preventDefault();

    const newCustomer = form.getValues();

    if (step !== 4) {
      setStep((prev) => prev + 1);
    } else {
      dispatch(
        selectCustomer({
          ...newCustomer,
          fullName: `${newCustomer.firstName} ${newCustomer.lastName}`,
        }),
      );
      await createCustomer(newCustomer);
      push("/cart");
    }
  };

  useEffect(() => {
    setFulfilledSteps((prev: number) => Math.max(prev, step - 1));

    if (step <= fulfilledSteps) {
      form.trigger();
    }
  }, [step, fulfilledSteps]);

  return (
    <div>
      <FormNavigation
        step={step}
        navConfig={addCustomerNavConfig}
        setStep={setStep}
        fulfilledSteps={fulfilledSteps}
      />
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
                  type="button"
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
                  disabled={!form.formState.isValid}
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
