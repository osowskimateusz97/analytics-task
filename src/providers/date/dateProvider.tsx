import React, { useState } from "react";
import { DateContext } from "./dateContext";
import { endOfDay, startOfDay } from "date-fns";
import { appConfig } from "@/config";
import { DateRange } from "@/types/appConfig";

type DateProviderProps = {
  children: React.ReactNode;
};

export type DateProviderState = {
  dateRange: DateRange;
  handleDateRange: (_: DateRange) => void;
};

// Context Provider Component
export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: DateProviderProps) => {
  const [dateRange, setDateRange] = useState<DateRange>(appConfig.datePicker);

  const handleDateRange = ({ from, to }: DateRange) => {
    const startDate = startOfDay(from);
    const endDate = endOfDay(to ? to : from); // If 'to' is undefined, set it to 'startDate'

    const payload: DateRange = {
      from: startDate,
      to: endDate,
    };
    setDateRange(payload);
  };

  return (
    <DateContext.Provider value={{ dateRange, handleDateRange }}>
      {children}
    </DateContext.Provider>
  );
};
