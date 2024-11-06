import { DateRange } from "@/types/appConfig";
import { subWeeks } from "date-fns";

export const datePickerConfig: DateRange = {
  from: subWeeks(new Date(), 10),
  to: new Date(),
};
