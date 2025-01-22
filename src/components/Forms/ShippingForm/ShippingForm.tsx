import React, { useEffect, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import CustomFormLabel from "@/components/Forms/CustomFormLabel/CustomFormLabel";
import { useLazyGetZipQuery } from "@/store/services/customersApi";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

const requiredFields = [
  "shippingStreet1",
  "shippingState",
  "shippingCity",
  "shippingZipCode",
  "shippingCountry",
];

const ShippingForm = () => {
  const form = useFormContext();
  const autoFill = form.watch("sameAsMailing");
  const hasRequiredFields = form.getValues("zipCode");
  const [getZip] = useLazyGetZipQuery();
  const shouldWatchZip = useRef(true);

  const zipCode = form.watch("shippingZipCode");
  const debouncedZipCode = useDebounce(zipCode, 500);

  const handleGetZip = async () => {
    const response = await getZip(debouncedZipCode);
    form.setValue("shippingState", response.data?.stateName, {
      shouldTouch: true,
      shouldValidate: !!response.data?.stateName,
    });
    form.setValue("shippingCity", response.data?.city, {
      shouldTouch: true,
      shouldValidate: !!response.data?.city,
    });
    form.setValue("shippingCountry", response.data?.stateName ? "US" : "", {
      shouldTouch: true,
      shouldValidate: !!(response.data?.stateName ? "US" : ""),
    });
  };

  useEffect(() => {
    if (debouncedZipCode && shouldWatchZip.current) {
      handleGetZip();
    }
  }, [debouncedZipCode]);

  const handleCheckboxChange = (checked: boolean) => {
    form.setValue("sameAsMailing", checked);

    shouldWatchZip.current = false;
    if (checked) {
      form.setValue("shippingStreet1", form.getValues("street1"));
      form.setValue("shippingStreet2", form.getValues("street2"));
      form.setValue("shippingState", form.getValues("state"));
      form.setValue("shippingCity", form.getValues("city"));
      form.setValue("shippingZipCode", form.getValues("zipCode"));
      form.setValue("shippingCountry", form.getValues("country"));
    } else {
      form.setValue("shippingStreet1", "");
      form.setValue("shippingStreet2", "");
      form.setValue("shippingState", "");
      form.setValue("shippingCity", "");
      form.setValue("shippingZipCode", "");
      form.setValue("shippingCountry", "");
    }
    setTimeout(() => {
      shouldWatchZip.current = true;
    }, 550);
    form.trigger(requiredFields);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="sameAsMailing"
        render={({ field }) => (
          <FormItem className="relative flex itams-center gap-3 grow">
            <FormControl>
              <Checkbox
                disabled={!hasRequiredFields}
                checked={field.value}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(checked as boolean)
                }
              />
            </FormControl>
            <FormLabel className="text-base font-medium">
              Same as Billing Address
            </FormLabel>
          </FormItem>
        )}
      />

      <FormField
        disabled={autoFill}
        control={form.control}
        name="shippingStreet1"
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
        disabled={autoFill}
        control={form.control}
        name="shippingStreet2"
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
        disabled={autoFill}
        control={form.control}
        name="shippingZipCode"
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
          disabled={autoFill}
          control={form.control}
          name="shippingState"
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
          disabled={autoFill}
          control={form.control}
          name="shippingCity"
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
        name="shippingCountry"
        render={({ field }) => (
          <FormItem className="relative grow">
            <CustomFormLabel
              label="Country"
              isRequired={requiredFields.includes(field.name)}
            />
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={autoFill}
            >
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

export default ShippingForm;
