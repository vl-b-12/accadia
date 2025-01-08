import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
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
import CustomFormLabel from "@/components/Forms/CustomFormLabel/CustomFormLabel";

const requiredFields = ["street1", "state", "city", "zip", "country"];

const MailingForm = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="street1"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="Street 1"
              isRequired={requiredFields.includes(field.name)}
            />
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
            <CustomFormLabel
              label="Street 2"
              isRequired={requiredFields.includes(field.name)}
            />
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
              <CustomFormLabel
                label="State"
                isRequired={requiredFields.includes(field.name)}
              />
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
              <CustomFormLabel
                label="City"
                isRequired={requiredFields.includes(field.name)}
              />
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
            <CustomFormLabel
              label="Zipcode"
              isRequired={requiredFields.includes(field.name)}
            />
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
            <CustomFormLabel
              label="Country"
              isRequired={requiredFields.includes(field.name)}
            />
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
