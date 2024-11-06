import { createContext } from "react";
import { DateProviderState } from "./dateProvider";
import { appConfig } from "@/config";
import { DateRange } from "@/types/appConfig";

const initialState: DateProviderState = {
  dateRange: appConfig.datePicker,
  handleDateRange: (_: DateRange) => {},
};

// Creating the context
export const DateContext = createContext<DateProviderState>(initialState);
