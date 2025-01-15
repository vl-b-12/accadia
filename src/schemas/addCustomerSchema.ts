import { z } from "zod";

export const addCustomerSchemaAccount = z.object({
  firstName: z.string().nonempty({
    message: "First Name is required",
  }),
  lastName: z.string().nonempty({
    message: "Last Name is required",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .nonempty({
      message: "Email is required",
    }),
  phoneNumber: z.string().nonempty({
    message: "Phone is required",
  }),
});

export const addCustomerSchemaBilling = z.object({
  street1: z.string().nonempty({
    message: "Street is required",
  }),
  street2: z.string().optional(),
  state: z.string().nonempty({
    message: "State is required",
  }),
  city: z.string().nonempty({
    message: "City is required",
  }),
  zipCode: z.string().nonempty({
    message: "Zip is required",
  }),
  country: z.string().nonempty({
    message: "Country is required",
  }),
});

export const addCustomerSchemaShipping = z.object({
  shippingStreet1: z.string().nonempty({
    message: "Street is required",
  }),
  shippingStreet2: z.string().optional(),
  shippingState: z.string().nonempty({
    message: "State is required",
  }),
  shippingCity: z.string().nonempty({
    message: "City is required",
  }),
  shippingZipCode: z.string().nonempty({
    message: "Zip is required",
  }),
  shippingCountry: z.string().nonempty({
    message: "Country is required",
  }),
});

export const addCustomerSchemaPersonal = z.object({
  birthday: z.string().optional(),
  anniversary: z.string().optional(),
  spouse: z.string().optional(),
  nationality: z.string().optional(),
});
