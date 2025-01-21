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
import {
  paymentFormDefaultValues,
  paymentNavConfig,
  paymentStepsMap,
} from "@/constants";
import FormNavigation from "@/components/FormNavigation/FormNavigation";
import { Form } from "@/components/ui/form";
import CreditCardForm from "@/components/Forms/CreditCardForm/CreditCardForm";
import { Button } from "@/components/ui/button";
import CheckForm from "@/components/Forms/CheckForm/CheckForm";
import CashForm from "@/components/Forms/CashForm/CashForm";
import WireTransferForm from "@/components/Forms/WireTransferForm/WireTransferForm";
import { paymentFormSchema } from "@/schemas/paymentSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/storeTypes";
import { useRouter } from "next/navigation";
import {
  clearCart,
  setBalanceDue,
  setPaid,
} from "@/store/slices/CartSlice/cartSlice";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useCreatePaymentMutation } from "@/store/services/paymentsApi";
import { clearSelectedCustomer } from "@/store/slices/CustomerSlice/customerSlice";

interface PaymentFormProps {
  type: PaymentType;
  setSelectedMethod: (selectedMethod: PaymentType) => void;
  step: number;
  setStep: (step: number) => void;
}

const PaymentForm = ({
  type,
  setSelectedMethod,
  setStep,
  step,
}: PaymentFormProps) => {
  const { push } = useRouter();
  const { balanceDue, grandTotal, cart, totalPrice, tax, discount } =
    useSelector((state: RootState) => state.cart);
  const { selectedCustomer } = useSelector(
    (state: RootState) => state.customer,
  );
  const isFullType = type === "full";
  const dispatch = useDispatch();

  const [createPayment] = useCreatePaymentMutation();

  const form = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: paymentFormDefaultValues,
    shouldUnregister: isFullType,
  });

  const paymentFormConfig: { [key: number]: ReactElement } = {
    1: <CreditCardForm type={type} />,
    2: <CheckForm type={type} step={step} />,
    3: <CashForm type={type} />,
    4: <WireTransferForm type={type} step={step} />,
  };

  const handleSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    const dataToSend = {
      customerId: selectedCustomer!.id,
      items: cart?.map((product) => ({
        sku: product.sku,
        name: product.name,
        price: +product.price,
      })),
      subtotal: +totalPrice,
      discount: +discount,
      tax: +tax,
      total: +grandTotal,
      paymentType: type,
      ...(!!data.creditCardAmount && {
        creditCardPayment: {
          amount: +data.creditCardAmount,
          last4Digits: data.last4Digits,
          cardholderName: data.cardholderName,
          bankName: data.bankName,
        },
      }),
      ...(!!data.checkAmount && {
        checkPayment: {
          amount: +data.checkAmount,
          bankName: data.bankNameAndNumber,
          accountNumber: data.accountNumber,
          referenceNumber: data.referenceNumber,
          dueDate: data.dueDate,
        },
      }),
      ...(!!data.cashAmount && {
        cashPayment: {
          amount: +data.cashAmount,
        },
      }),
      ...(!!data.wireTransferAmount && {
        wirePayment: {
          amount: +data.wireTransferAmount,
          bankName: data.wireTransferBankNameAndNumber,
          accountNumber: data.wireTransferAccountNumber,
          referenceNumber: data.wireTransferReferenceNumber,
          dueDate: data.wireTransferDueDate,
        },
      }),
    };

    await createPayment(dataToSend);
    dispatch(clearCart());
    dispatch(clearSelectedCustomer());
    push("/generate-invoice");
  };

  useEffect(() => {
    form.clearErrors();

    if (isFullType) {
      dispatch(setPaid(0));
    }
  }, [step, type, isFullType]);

  useEffect(() => {
    if (isFullType && step > 0) {
      form.reset();
      dispatch(setBalanceDue(0));
      form.setValue(paymentStepsMap[step], grandTotal.toString());
    }
  }, [step, isFullType]);

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
            paymentType={type}
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
                {Object.entries(paymentFormConfig).map(([key, value]) => (
                  <div
                    key={key}
                    className={cn("hidden", { block: +key === step })}
                  >
                    {value}
                  </div>
                ))}
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
