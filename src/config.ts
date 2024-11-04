import { subWeeks } from "date-fns";
import { DateRange } from "./types/dates";

export const APP_CONFIG: AppConfig = {
  DATE_PICKER: {
    // 2 months
    from: subWeeks(new Date(), 10),
    to: new Date(),
  },
};

interface AppConfig {
  DATE_PICKER: DateRange;
}
