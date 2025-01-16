import { z } from "zod";

export const paymentFormSchema = z
  .object({
    creditCardAmount: z.string().optional(),
    last4Digits: z.string().optional(),
    cardholderName: z.string().optional(),
    bankName: z.string().optional(),
    checkAmount: z.string().optional(),
    bankNameAndNumber: z.string().optional(),
    accountNumber: z.string().optional(),
    referenceNumber: z.string().optional(),
    dueDate: z.string().optional(),
    cashAmount: z.string().optional(),
    wireTransferAmount: z.string().optional(),
    wireTransferBankNameAndNumber: z.string().optional(),
    wireTransferAccountNumber: z.string().optional(),
    wireTransferReferenceNumber: z.string().optional(),
    wireTransferDueDate: z.string().optional(),
  })
  .refine((data) => {
    if (
      data.creditCardAmount &&
      (!data.last4Digits || !data.cardholderName || !data.bankName)
    ) {
      return false;
    }

    if (
      data.checkAmount &&
      (!data.bankNameAndNumber ||
        !data.accountNumber ||
        !data.referenceNumber ||
        !data.dueDate)
    ) {
      return false;
    }

    if (
      data.wireTransferAmount &&
      (!data.wireTransferBankNameAndNumber ||
        !data.wireTransferAccountNumber ||
        !data.wireTransferReferenceNumber ||
        !data.wireTransferDueDate)
    ) {
      return false;
    }

    return true;
  });
