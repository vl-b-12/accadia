import { apiRtk } from "../";
import { Customer } from "@/types/types";
import { ProductToSend } from "@/store/services/paymentsApi";
import { REQUEST } from "@/types/requestTypes";

interface Pagination {
  page: number;
  hasNextPage: boolean;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface TransformedCustomerResponse extends Pagination {
  items: Customer[];
}

interface NewCustomer {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  street1?: string;
  street2?: string;
  zipCode?: string;
  state?: string;
  city?: string;
  country?: string;
  shippingStreet1?: string;
  shippingStreet2?: string;
  shippingZipCode?: string;
  shippingState?: string;
  shippingCity?: string;
  shippingCountry?: string;
  birthDay?: string;
  anniversary?: string;
  spouse?: string;
  nationality?: string;
}

interface CustomerResponse {
  firstName?: string;
  lastName?: string;
  id: number;
}

interface ZipResponse {
  zipCode: string;
  city: string;
  sateId: string;
  stateName: string;
}

export interface CustomerHistoryResponse {
  paymentId: number;
  docNo: string;
  purchaseDate: string;
  price: number;
  taxes: number;
  userCreditCardPayment: boolean;
  useCheckPayment: boolean;
  useCashPayment: boolean;
  useWirePayment: boolean;
  products: ProductToSend[];
}

export interface TransformedHistoryResponse extends Pagination {
  items: CustomerHistoryResponse[];
}

export interface CustomerHistoryQuery {
  page?: number;
  customerId?: string;
  sort?: string;
}

interface CompanyNameResponse {
  companyName: string;
}

interface CountriesResponse {
  id: number;
  name: string;
}

interface ShareSMSRequest {
  phoneTo: string;
  messageBody: string;
}

export interface GetDocumentLinksResponse {
  title: string;
  url: string;
}

export const customersApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query<
      TransformedCustomerResponse,
      { name?: string; page?: number } | undefined
    >({
      query: (props) => ({
        url: "/customers",
        method: REQUEST.GET,
        params: props,
      }),
      transformResponse: (response: TransformedCustomerResponse) => {
        return {
          ...response,
          items: response.items.map((customer) => ({
            ...customer,
            fullName: `${customer.firstName} ${customer.lastName}`,
          })),
        };
      },
      providesTags: ["customers"],
    }),
    createCustomer: build.mutation<CustomerResponse, NewCustomer>({
      query: (props: NewCustomer) => ({
        url: "/customers",
        method: REQUEST.POST,
        body: props,
      }),
      invalidatesTags: ["customers"],
    }),
    getZip: build.query<ZipResponse, string>({
      query: (zip: string) => ({
        url: `/customers/zip-lookup/${zip}`,
        method: REQUEST.GET,
      }),
    }),
    getHistory: build.query<TransformedHistoryResponse, CustomerHistoryQuery>({
      query: ({ page, customerId, sort }) => ({
        url: `/customers/history/${customerId}`,
        method: REQUEST.GET,
        params: { page, sort },
      }),
      providesTags: ["customersHistory"],
    }),
    getCompanyName: build.query<CompanyNameResponse, void>({
      query: () => ({
        url: "/customers/get-company-name",
        method: REQUEST.GET,
      }),
    }),
    getCountries: build.query<CountriesResponse[], void>({
      query: () => ({
        url: "/customers/get-countries",
        method: REQUEST.GET,
      }),
    }),
    shareSms: build.mutation<unknown, ShareSMSRequest>({
      query: (props) => ({
        url: "/customers/share-sms",
        method: REQUEST.POST,
        body: props,
      }),
    }),
    getDocumentLinks: build.query<GetDocumentLinksResponse[], number>({
      query: (id) => ({
        url: `customers/document-links/${id}`,
        method: REQUEST.GET,
      }),
    }),
  }),
});

export const {
  useShareSmsMutation,
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useLazyGetZipQuery,
  useGetHistoryQuery,
  useGetCompanyNameQuery,
  useGetCountriesQuery,
  useLazyGetDocumentLinksQuery,
} = customersApi;
