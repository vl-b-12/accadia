import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { historySortOptions } from "@/constants";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/storeTypes";

interface HistorySearchSectionProps {
  selectedFilterOption: string;
  setSelectedFilterOption: (selectedFilterOption: string) => void;
}

const HistorySearchSection = ({
  selectedFilterOption,
  setSelectedFilterOption,
}: HistorySearchSectionProps) => {
  const { push } = useRouter();
  const { selectedHistoryCustomer } = useSelector(
    (state: RootState) => state.customer,
  );
  return (
    <div className="p-6 flex items-center justify-between gap-6">
      <div className="flex gap-8 items-center ">
        <Button
          variant="secondary"
          className="px-8 py-3 h-11 bg-violent-10 border border-violent-20 rounded-md hover:bg-violent-20 duration-300"
          onClick={() => {
            push("/customers");
          }}
        >
          <Image
            src="/icons/back-icon.svg"
            alt="back icon"
            unoptimized
            width={20}
            height={20}
          />
        </Button>
        <div className="text-2xl text-black font-medium">
          {selectedHistoryCustomer?.fullName} History
        </div>
      </div>
      <div>
        <Select
          onValueChange={setSelectedFilterOption}
          value={selectedFilterOption}
        >
          <SelectTrigger className="w-[194px] border border-violent-40 text-violent-30">
            <SelectValue>
              {
                historySortOptions.find(
                  (option) => option.id === selectedFilterOption,
                )?.value
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {historySortOptions.map((option, id) => (
              <SelectItem
                key={`${option.id}_${id}`}
                value={option.id}
                hideCheckIcon
              >
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HistorySearchSection;
