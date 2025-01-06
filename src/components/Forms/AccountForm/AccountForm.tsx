import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const AccountForm = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">First Name</FormLabel>
            <FormControl>
              <Input
                {...field}
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
            <FormLabel className="text-base font-medium">Last Name</FormLabel>
            <FormControl>
              <Input
                {...field}
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
            <FormLabel className="text-base font-medium">Email</FormLabel>
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
        name="phone"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">
              Phone Number
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter Phone Number"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    field.onChange(e);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AccountForm;
