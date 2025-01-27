import { REQUEST } from "@/store/storeTypes";
import { apiRtk } from "../";

export interface ProductToSend {
  sku: string;
  name: string;
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
    getInvoice: build.query({
      query: (paymentId) => ({
        url: `/payments/get-invoice/${paymentId}`,
        method: REQUEST.GET,
        responseHandler: (res) => res.blob(),
        headers: {
          "Accept-type": "application/pdf",
        },
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useLazyGetInvoiceQuery } = paymentsApi;
