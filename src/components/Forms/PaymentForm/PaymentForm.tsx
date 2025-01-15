import React, { ReactElement, useEffect } from "react";
import { PaymentType } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaymentSelectItem from "@/components/Forms/PaymentForm/PaymentSelectItem/PaymentSelectItem";
import { useForm } from "react-hook-form";
import { paymentNavConfig } from "@/constants";
import FormNavigation from "@/components/FormNavigation/FormNavigation";
import { Form } from "@/components/ui/form";
import CreditCardForm from "@/components/Forms/CreditCardForm/CreditCardForm";
import { Button } from "@/components/ui/button";
import CheckForm from "@/components/Forms/CheckForm/CheckForm";
import CashForm from "@/components/Forms/CashForm/CashForm";
import WireTransferForm from "@/components/Forms/WireTransferForm/WireTransferForm";
import { z } from "zod";
import {
  cashFormSchema,
  checkFormSchema,
  creditCardFormSchema,
  wireTransferFormSchema,
} from "@/schemas/paymentSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { useRouter } from "next/navigation";
import { setPaid } from "@/store/slices/CartSlice/cartSlice";

interface PaymentFormProps {
  type: PaymentType;
  setSelectedMethod: (selectedMethod: PaymentType) => void;
  step: number;
  setStep: (step: number) => void;
}

const paymentFormDefaultValues: { [key: number]: { [key: string]: string } } = {
  1: {
    creditCardAmount: "",
    last4Digits: "",
    cardholderName: "",
    bankName: "",
  },
  2: {
    checkAmount: "",
    bankNameAndNumber: "",
    accountNumber: "",
    referenceNumber: "",
    dueDate: "",
  },
  3: {
    cashAmount: "",
  },
  4: {
    wireTransferAmount: "",
    wireTransferBankNameAndNumber: "",
    wireTransferAccountNumber: "",
    wireTransferReferenceNumber: "",
    wireTransferDueDate: "",
  },
};

const paymentFormSchemas: { [key: number]: z.ZodSchema } = {
  1: creditCardFormSchema,
  2: checkFormSchema,
  3: cashFormSchema,
  4: wireTransferFormSchema,
};

const PaymentForm = ({
  type,
  setSelectedMethod,
  setStep,
  step,
}: PaymentFormProps) => {
  const { push } = useRouter();
  const { balanceDue } = useSelector((state: RootState) => state.cart);
  const isFullType = type === "full";
  const dispatch = useDispatch();

  const form = useForm({
    resolver: step > 0 ? zodResolver(paymentFormSchemas[step]) : undefined,
    defaultValues: step > 0 ? paymentFormDefaultValues[step] : undefined,
    shouldUnregister: isFullType,
  });

  const paymentFormConfig: { [key: number]: ReactElement } = {
    1: <CreditCardForm type={type} />,
    2: <CheckForm type={type} />,
    3: <CashForm type={type} />,
    4: <WireTransferForm type={type} />,
  };

  const handleSubmit = async () => {
    push("/generate-invoice");
  };

  useEffect(() => {
    form.clearErrors();

    if (isFullType) {
      dispatch(setPaid(0));
    }
  }, [step, type]);

  return (
    <div className="mt-6">
      <div className="font-bold text-2xl text-violent-80 mb-8">
        {isFullType ? "Full Payment" : "Split Payment"}
      </div>
      <Select
        onValueChange={(value: PaymentType) => {
          setSelectedMethod(value);
          setStep(0);
          form.reset();
          dispatch(setPaid(0));
        }}
        defaultValue={type}
      >
        <SelectTrigger
          className="h-[76px] p-4 rounded-md bg-violent-20"
          chevronClassName="text-black"
        >
          <SelectValue placeholder="Collection" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full" hideCheckIcon>
            <PaymentSelectItem
              isActive={isFullType}
              icon="/icons/wallet-icon.svg"
              text="Full Payment With One System"
            />
          </SelectItem>
          <SelectItem value="split" hideCheckIcon>
            <PaymentSelectItem
              isActive={!isFullType}
              icon="/icons/coins-icon.svg"
              text="Split Payment Across Systems"
            />
          </SelectItem>
        </SelectContent>
      </Select>

      <Form {...form}>
        <form className="mt-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormNavigation
            type="payment"
            step={step}
            navConfig={paymentNavConfig}
            setStep={setStep}
          />

          {step === 0 && isFullType ? (
            <div className="text-lg font-medium mt-8 text-center">
              Choose preferable payment system
            </div>
          ) : (
            <>
              <div className="max-w-[342px] mt-6 h-full">
                {paymentFormConfig[step]}
              </div>

              <Button
                variant="primary"
                className="h-14 uppercase w-[166px] absolute right-6 bottom-6"
                type="submit"
                disabled={!form.formState.isValid || balanceDue !== 0}
              >
                Submit
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
