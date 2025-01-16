import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { PaymentType } from "@/types/types";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (data: string | undefined) => void;
  step?: number;
  type?: PaymentType;
}

export function DatePicker({ value, onChange, step, type }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>();

  useEffect(() => {
    setDate(value);
  }, []);

  const handleDateSelect = (selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate.toISOString());
    }
  };

  useEffect(() => {
    if (type === "full") {
      setDate(undefined);
      onChange(undefined);
    }
  }, [step, type]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-[50px] justify-start text-left font-normal border-violent-30 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-violent-40 hover:bg-transparent",
            !date && "text-muted-foreground ",
          )}
        >
          <CalendarIcon className="text-gray-70" />
          {date ? (
            <div className="text-base font-semibold text-black">
              {format(date, "PPP")}
            </div>
          ) : (
            <span className="text-base font-medium text-gray-70">
              Pick a date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
