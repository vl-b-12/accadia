import { REQUEST } from "@/store/storeTypes";
import { apiRtk } from "../";

export interface ProductToSend {
  sku: number;
  price: number;
}

interface CreditCardPayment {
  amount?: number;
  last4Digits?: string;
  cardholderName?: string;
  bankName?: string;
}

interface CheckPayment {
  amount?: number;
  bankName?: string;
  accountNumber?: string;
  referenceNumber?: string;
  dueDate?: string;
}

interface CashPayment {
  amount?: number;
}

interface WirePayment {
  amount?: number;
  bankName?: string;
  accountNumber?: string;
  referenceNumber?: string;
  dueDate?: string;
}

interface PaymentRequest {
  customerId: number;
  items: ProductToSend[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentType: string;
  creditCardPayment?: CreditCardPayment;
  checkPayment?: CheckPayment;
  cashPayment?: CashPayment;
  wirePayment?: WirePayment;
}

export const paymentsApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation<void, PaymentRequest>({
      query: (props) => ({
        url: "/payments",
        method: REQUEST.POST,
        body: props,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentsApi;
