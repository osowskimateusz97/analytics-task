import { DateRange } from "@/types/dates";
import { subMonths, subWeeks, subYears } from "date-fns";

export enum DATE_RANGE_TYPE {
  LAST_MONTH = "LAST_MONTH",
  LAST_WEEK = "LAST_WEEK",
  LAST_YEAR = "LAST_YEAR",
}

export function getDateRange(type: DATE_RANGE_TYPE): DateRange {
  const today = new Date();

  const from = {
    [DATE_RANGE_TYPE.LAST_MONTH]: subMonths(today, 1),
    [DATE_RANGE_TYPE.LAST_WEEK]: subWeeks(today, 1),
    [DATE_RANGE_TYPE.LAST_YEAR]: subYears(today, 1),
  };

  return {
    from: from[type],
    to: today,
  };
}
