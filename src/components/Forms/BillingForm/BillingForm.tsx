import React, { useEffect } from "react";
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
import { useLazyGetZipQuery } from "@/store/services/customersApi";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

const requiredFields = ["street1", "state", "city", "zipCode", "country"];

const BillingForm = () => {
  const form = useFormContext();
  const [getZip] = useLazyGetZipQuery();

  const zipCode = form.watch("zipCode");
  const debouncedZipCode = useDebounce(zipCode, 500);

  const handleGetZip = async () => {
    const response = await getZip(debouncedZipCode);
    form.setValue("state", response.data?.stateName);
    form.setValue("city", response.data?.city);
    form.setValue("country", response.data?.stateName ? "US" : "");
  };

  useEffect(() => {
    if (debouncedZipCode) {
      handleGetZip();
    }
  }, [debouncedZipCode]);

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
                autoComplete="off"
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
                autoComplete="off"
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
        name="zipCode"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="Zipcode"
              isRequired={requiredFields.includes(field.name)}
            />
            <FormControl>
              <Input
                {...field}
                autoComplete="off"
                placeholder="Enter zipcode"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
        name="country"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="Country"
              isRequired={requiredFields.includes(field.name)}
            />
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl
                className={cn(
                  "text-base font-medium text-gray-70 placeholder:font-medium placeholder:text-gray-70",
                  { "text-base font-semibold text-black": !!field.value },
                )}
              >
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

export default BillingForm;
