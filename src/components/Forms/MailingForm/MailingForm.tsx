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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constants";

const MailingForm = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="street1"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Street 1</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter street"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="street2"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Street 2</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter street"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-3">
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="relative grow">
              <FormLabel className="text-base font-medium">State</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter State"
                  className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="relative grow self-end">
              <FormLabel className="text-base font-medium">City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter city"
                  className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="zip"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Zipcode</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter zipcode"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Country</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="text-base font-medium text-gray-70 placeholder:font-medium placeholder:text-gray-70">
                <SelectTrigger className="h-[50px] w-full border border-violent-30">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country, index) => (
                  <SelectItem key={index} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default MailingForm;
