import { AnalyticsCollection } from "@/schemas/analytics";
import { parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";

/**
 * Filters a list of channel analytics data to include only those entries within the specified date range.
 *
 * @param data - The analytics data to be filtered.
 * @param startDate - Start date of the range, in (YYYY-MM-DD) format.
 * @param endDate - End date of the range, in (YYYY-MM-DD) format.
 * @returns A filtered array of analytics data.
 */
export function filterDataByDateRange(
  data: AnalyticsCollection,
  startDate: Date,
  endDate: Date
) {
  return data.filter((item) => {
    const itemDate = parseISO(item.date);
    return isWithinInterval(itemDate, {
      start: startOfDay(startDate),
      end: endOfDay(endDate),
    });
  });
}
