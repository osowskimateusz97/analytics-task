import analyticsData from "@/db/analytics.json";
import {
  AnalyticsCollection,
  AnalyticCollectionSchema,
} from "@/schemas/analytics";
import { filterDataByDateRange } from "@/utils/filterDbResponse";

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
export const fetchAnalytics = async (
  startDate: Date,
  endDate: Date
): Promise<AnalyticsCollection> => {
  try {
    AnalyticCollectionSchema.parse(analyticsData);
    // TODO: Replace the following logic with a real API request when backend is ready.
    return new Promise((res) =>
      setTimeout(() => {
        const filteredAnalyticsByDate = filterDataByDateRange(
          analyticsData as AnalyticsCollection,
          startDate,
          endDate
        );
        res(filteredAnalyticsByDate);
      }, 2000)
    );
  } catch (err: unknown) {
    console.error(err);
    throw Error("Problem with fetching analytics");
  }
};
