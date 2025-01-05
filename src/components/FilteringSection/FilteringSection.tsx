import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { addTempFilters } from "@/store/slices/CartSlice/cartSlice";

interface FilteringSectionProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const filterInputStyle =
  "h-12 rounded-md text-black text-sm placeholder:text-sm placeholder:text-black border-0 p-4";

const FilteringSection = ({ isOpen, setOpen }: FilteringSectionProps) => {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      code: "",
      sku: "",
      collection: "",
      name: "",
      type: "",
    },
  });

  //TODO delete later

  const { watch } = form;

  const watchAllFields = watch();

  useEffect(() => {
    dispatch(addTempFilters(watchAllFields));
  }, [watchAllFields]);

  return (
    <div
      className={cn("flex gap-[10px] grow", {
        "bg-gray-5 rounded-md w-auto justify-between": isOpen,
      })}
    >
      {isOpen && (
        <Form {...form}>
          <form className="grid grid-cols-5 items-center gap-[10px] grow pl-4 shrink">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Code"
                      className={filterInputStyle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="SKU"
                      className={filterInputStyle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Collection"
                      className={filterInputStyle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Jewelry Name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sleipnir">Sleipnir</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="grow">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Jewelry Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Ring">Ring</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}

      <div
        className={cn(
          "flex items-center justify-center size-[66px] rounded-md",
        )}
        onClick={() => {
          setOpen(!isOpen);
          form.reset();
        }}
      >
        <Image
          src="/icons/filter-icon.svg"
          alt="Logout icon"
          width={25}
          height={22}
          className={cn(
            "opacity-20 hover:opacity-100 duration-300 cursor-pointer",
            { "opacity-100": isOpen },
          )}
        />
      </div>
    </div>
  );
};

export default FilteringSection;
