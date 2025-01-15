"use client";

import React, { useState } from "react";
import PageSection from "@/components/PageSection/PageSection";
import PaymentTotalPriceSection from "@/components/PaymentTotalPriceSection/PaymentTotalPriceSection";
import PaymentTypeSelectionSection from "@/components/PaymentTypeSelectorSection/PaymentTypeSelectionSection";
import PaymentForm from "@/components/Forms/PaymentForm/PaymentForm";
import { PaymentType } from "@/types/types";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentType | null>(
    null,
  );
  const [step, setStep] = useState(0);

  return (
    <div className="pb-4 px-6 pt-[106px] min-h-screen bg-gray-5">
      <PageSection className="p-6 min-h-[calc(100vh-122px)] relative">
        <PaymentTotalPriceSection step={step} />
        {!selectedMethod ? (
          <>
            <div className="mt-6 mb-[86px] font-bold text-2xl text-violent-80">
              Select Payment Method
            </div>
            <PaymentTypeSelectionSection onClick={setSelectedMethod} />
          </>
        ) : (
          <PaymentForm
            type={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            step={step}
            setStep={setStep}
          />
        )}
      </PageSection>
    </div>
  );
};

export default PaymentPage;
