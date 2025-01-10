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
import { Checkbox } from "@/components/ui/checkbox";
import CustomFormLabel from "@/components/Forms/CustomFormLabel/CustomFormLabel";

const requiredFields = [
  "shippingStreet1",
  "shippingState",
  "shippingCity",
  "shippingZip",
  "shippingCountry",
];

const ShippingForm = () => {
  const form = useFormContext();
  const autoFill = form.watch("sameAsMailing");

  const handleCheckboxChange = (checked: boolean) => {
    form.setValue("sameAsMailing", checked);

    if (checked) {
      form.setValue("shippingStreet1", form.getValues("street1"));
      form.setValue("shippingStreet2", form.getValues("street2"));
      form.setValue("shippingState", form.getValues("state"));
      form.setValue("shippingCity", form.getValues("city"));
      form.setValue("shippingZip", form.getValues("zip"));
      form.setValue("shippingCountry", form.getValues("country"));
    } else {
      form.setValue("shippingStreet1", "");
      form.setValue("shippingStreet2", "");
      form.setValue("shippingState", "");
      form.setValue("shippingCity", "");
      form.setValue("shippingZip", "");
      form.setValue("shippingCountry", "");
    }

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
                checked={field.value}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(checked as boolean)
                }
              />
            </FormControl>
            <FormLabel className="text-base font-medium">
              Same as Mailing Address
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
        name="shippingZip"
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

export default ShippingForm;
