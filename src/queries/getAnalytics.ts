import analiticsData from "@/db/analytics.json";
import { ChannelAnalytics } from "@/types/analytics";
import { filterDataByDateRange } from "@/utils/filterAnalyticsUtils";

/**
 * Fetches analytics data filtered by date range.
 * Currently, this function simulates fetching and filtering data locally.
 *
 * @param startDate - The start date for the analytics range, in (YYYY-MM-DD) format.
 * @param endDate - The end date for the analytics range, in (YYYY-MM-DD) format.
 * @returns A promise that resolves with the filtered analytics data.
 *
 * Note: In the future, this implementation can be replaced with a direct API call
 * to a backend service. The `filterDataByDateRange` could be removed and instead,
 * the API endpoint will receive `startDate` and `endDate` to filter the data on the server.
 */
export const getAnalytics = async (
  startDate: Date,
  endDate: Date
): Promise<ChannelAnalytics[]> => {
  // TODO: Replace the following logic with a real API request when backend is ready.
  const filteredAnalyticsByDate = filterDataByDateRange(
    analiticsData,
    startDate,
    endDate
  );

  return new Promise((res) =>
    setTimeout(() => res(filteredAnalyticsByDate), 2000)
  );
};
