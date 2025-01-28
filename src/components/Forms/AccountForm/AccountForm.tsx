import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import CustomFormLabel from "@/components/Forms/CustomFormLabel/CustomFormLabel";

const requiredFields = ["firstName", "lastName", "email", "phoneNumber"];

const AccountForm = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="First Name"
              isRequired={requiredFields.includes(field.name)}
            />
            <FormControl>
              <Input
                {...field}
                autoComplete="off"
                placeholder="Enter First Name"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="Last Name"
              isRequired={requiredFields.includes(field.name)}
            />
            <FormControl>
              <Input
                {...field}
                autoComplete="off"
                placeholder="Enter Last Name"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="Email"
              isRequired={requiredFields.includes(field.name)}
            />
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="Enter Email"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="Phone Number"
              isRequired={requiredFields.includes(field.name)}
            />
            <FormControl>
              <>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Enter Phone Number"
                  className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(e);
                    }
                  }}
                />
                <div className="text-xs font-medium">
                  By providing your mobile phone number you agree to receive
                  messages from “Jewelianna“. Message and data rates may apply
                </div>
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AccountForm;
