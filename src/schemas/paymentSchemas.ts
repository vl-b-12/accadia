import { z } from "zod";

export const creditCardFormSchema = z.object({
  creditCardAmount: z.string().nonempty({
    message: "Amount is required",
  }),
  last4Digits: z.string().nonempty({
    message: "Please enter card number last 4 digits",
  }),
  cardholderName: z.string().nonempty({
    message: "Cardholder Name  is required",
  }),
  bankName: z.string().nonempty({
    message: "Bank Name is required",
  }),
});

export const checkFormSchema = z.object({
  checkAmount: z.string().nonempty({
    message: "Amount is required",
  }),
  bankNameAndNumber: z.string().nonempty({
    message: "Please enter Bank Name / Number",
  }),
  accountNumber: z.string().nonempty({
    message: "Account Number is required",
  }),
  referenceNumber: z.string().nonempty({
    message: "Reference Number is required",
  }),
  dueDate: z.string().nonempty({
    message: "Due Date is required",
  }),
});

export const cashFormSchema = z.object({
  cashAmount: z.string().nonempty({
    message: "Amount is required",
  }),
});

export const wireTransferFormSchema = z.object({
  wireTransferAmount: z.string().nonempty({
    message: "Amount is required",
  }),
  wireTransferBankNameAndNumber: z.string().nonempty({
    message: "Please enter Bank Name / Number",
  }),
  wireTransferAccountNumber: z.string().nonempty({
    message: "Account Number is required",
  }),
  wireTransferReferenceNumber: z.string().nonempty({
    message: "Reference Number is required",
  }),
  wireTransferDueDate: z.string().nonempty({
    message: "Due Date is required",
  }),
});
