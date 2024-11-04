import { APP_CONFIG } from "@/config";
import { createContext } from "react";
import { DateProviderState } from "./dateProvider";
import { DateRange } from "@/types/dates";

const initialState: DateProviderState = {
  dateRange: APP_CONFIG.DATE_PICKER,
  setDateRange: (_: DateRange) => {},
};

// Creating the context
export const DateContext = createContext<DateProviderState>(initialState);
