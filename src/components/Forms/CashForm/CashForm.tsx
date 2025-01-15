import React from "react";

import { PaymentType } from "@/types/types";

import PaymentAmountInput from "@/components/Forms/PaymentAmountInput/PaymentAmountInput";

interface CashFormProps {
  type: PaymentType;
}

const CashForm = ({ type }: CashFormProps) => {
  return <PaymentAmountInput type={type} name="cashAmount" />;
};

export default CashForm;
