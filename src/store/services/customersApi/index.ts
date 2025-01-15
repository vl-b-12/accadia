import { REQUEST } from "@/store/storeTypes";
import { apiRtk } from "../";
import { Customer } from "@/types/types";

interface TransformedCustomer extends Customer {
  fullName: string;
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

export const customersApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query<TransformedCustomer[], void>({
      query: () => ({
        url: "/customers",
        method: REQUEST.GET,
      }),
      transformResponse: (response: Customer[]) => {
        return response.map((customer) => ({
          ...customer,
          fullName: `${customer.firstName} ${customer.lastName}`,
        }));
      },
      providesTags: ["customers"],
    }),
    createCustomer: build.mutation<void, NewCustomer>({
      query: (props: NewCustomer) => ({
        url: "/customers",
        method: REQUEST.POST,
        body: props,
      }),
      invalidatesTags: ["customers"],
    }),
  }),
});

export const { useGetCustomersQuery, useCreateCustomerMutation } = customersApi;
