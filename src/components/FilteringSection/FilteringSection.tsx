import React, { useEffect } from "react";
import Image from "next/image";
import { cleanFilters, cn } from "@/lib/utils";
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
import { useLazyGetFiltersQuery } from "@/store/services/filtersApi";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedFilters,
  selectFilter,
} from "@/store/slices/FilterSlice/filterSlice";
import { RootState } from "@/store/storeTypes";
import { Filters } from "@/types/types";
import { useDebounce } from "@/hooks/useDebounce";

interface FilteringSectionProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const filterInputStyle =
  "h-12 rounded-md text-black text-sm placeholder:text-sm placeholder:text-black border-0 p-4";

const FilteringSection = ({ isOpen, setOpen }: FilteringSectionProps) => {
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector((state: RootState) => state.filter);

  const form = useForm({
    defaultValues: {
      code: "",
      sku: "",
      collection: "",
      name: "",
      jewelryType: "",
    },
  });

  const watchAllFields = form.watch();
  const debouncedFilters = useDebounce(watchAllFields, 300);

  useEffect(() => {
    const cleanedFilters = cleanFilters(debouncedFilters);

    const isFilterCountChange =
      Object.keys(cleanedFilters).length !==
      Object.keys(selectedFilters || {}).length;
    const isFilterValueChanged = Object.entries(cleanedFilters || {}).some(
      ([key, value]) => value !== selectedFilters?.[key as keyof Filters],
    );
    if (isFilterCountChange || isFilterValueChanged) {
      dispatch(selectFilter(cleanedFilters));
    }
  }, [debouncedFilters, selectedFilters]);

  const [getFilters, { data }] = useLazyGetFiltersQuery();

  const handleFiltersOpen = async () => {
    setOpen(!isOpen);
    if (!isOpen) {
      await getFilters();
    } else {
      form.reset();
      dispatch(clearSelectedFilters());
    }
  };

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
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Jewelry Name"
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
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value === "Collection" ? null : value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Collection" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Collection">Collection</SelectItem>
                      {data?.collections.map((collectionItem, id) => (
                        <SelectItem
                          key={`${collectionItem.id}_${id}`}
                          value={collectionItem.name}
                        >
                          {collectionItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jewelryType"
              render={({ field }) => (
                <FormItem className="grow">
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value === "jewelry type" ? null : value)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Jewelry Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jewelry type">Jewelry Type</SelectItem>
                      {data?.jewelryTypes?.map((type, id) => (
                        <SelectItem key={`${type.id}_${id}`} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
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
        onClick={handleFiltersOpen}
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
