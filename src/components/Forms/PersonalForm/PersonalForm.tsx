import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/components/ui/datePicker";

const PersonalForm = () => {
  const { push } = useRouter();
  const form = useFormContext();

  const handleSubmit: SubmitHandler<FieldValues> = (_, e) => {
    e?.preventDefault();
    push("/cart");
  };

  return (
    <form
      className="flex flex-col gap-6 w-[475px] py-6"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FormField
        control={form.control}
        name="birthDay"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Birthday</FormLabel>
            <FormControl>
              <DatePicker {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="anniversary"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Anniversary</FormLabel>
            <FormControl>
              <DatePicker {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="spouse"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Spouse</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoComplete="off"
                type="spouse"
                placeholder="Enter Info About Spouse"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem className="relative grow">
            <FormLabel className="text-base font-medium">Nationality</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoComplete="off"
                placeholder="Enter Nationality"
                className="h-[50px] py-2 pr-8 placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-gray-70 grow-1 border-violent-30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};

export default PersonalForm;
