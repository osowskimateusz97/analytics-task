import React, { useState } from "react";
import { APP_CONFIG } from "@/config";
import { DateContext } from "./dateContext";
import { DateRange } from "@/types/dates";

type DateProviderProps = {
  children: React.ReactNode;
};

export type DateProviderState = {
  dateRange: DateRange;
  setDateRange: (_: DateRange) => void;
};

// Context Provider Component
export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: DateProviderProps) => {
  const [dateRange, setDateRange] = useState<DateRange>(APP_CONFIG.DATE_PICKER);

  return (
    <DateContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateContext.Provider>
  );
};
