import _ from "lodash";
import { format } from "date-fns";
import { formatCurrencyPLN, formatNumber } from "./currencyFormatting";
import {
  AnalyticsData,
  DateAggregation,
  MappedAnalyticsData,
} from "@/types/analytics";
import { Brand } from "@/types/appConfig";
import { getBrandLogo } from "./config";

export const getTotalSales = (analyticsData: MappedAnalyticsData): string => {
  const totalSales = analyticsData.aggregatedByChannel.reduce(
    (acc, channel) => acc + channel.total_sales,
    0
  );
  return formatCurrencyPLN(totalSales);
};

export const getTotalOrders = (analyticsData: MappedAnalyticsData): string => {
  const total = analyticsData.aggregatedByChannel.reduce(
    (acc, channel) => acc + channel.total_orders,
    0
  );
  const formattedTotalOrders = formatNumber(total);
  return formattedTotalOrders;
};

export const getTopSaler = (
  analyticsData: MappedAnalyticsData
): {
  brand_name: Brand | "Unknown";
  totalSales: string;
  logo: string;
} => {
  const topSaler = analyticsData.aggregatedByChannel.reduce(
    (max, curr) => (max.total_sales > curr.total_sales ? max : curr),
    analyticsData.aggregatedByChannel[0]
  );
  return {
    brand_name: topSaler.brand_name,
    logo: getBrandLogo(topSaler.brand_name),
    totalSales: topSaler ? formatCurrencyPLN(topSaler.total_sales) : "0",
  };
};

export const getTopOrder = (
  analyticsData: MappedAnalyticsData
): { brand_name: Brand; totalOrders: string; logo: string } => {
  const topOrder = analyticsData.aggregatedByChannel.reduce(
    (max, curr) => (max.total_orders > curr.total_orders ? max : curr),
    analyticsData.aggregatedByChannel[0]
  );
  return {
    brand_name: topOrder.brand_name,
    logo: getBrandLogo(topOrder.brand_name),
    totalOrders: topOrder ? formatNumber(topOrder.total_orders) : "0",
  };
};

export const getTopPerformingDay = (
  analyticsData: MappedAnalyticsData
): string => {
  const mostSalesDayObj = analyticsData.aggregatedByDate.reduce(
    (max, curr) => (max.total_sales > curr.total_sales ? max : curr),
    analyticsData.aggregatedByDate[0]
  );
  const mostSalesDay = mostSalesDayObj
    ? format(new Date(mostSalesDayObj.date), "yyyy-MM-dd")
    : "Unknown";
  return mostSalesDay;
};

export const convertToChartData = (aggregatedByDate: DateAggregation[]) => {
  return aggregatedByDate.map((dateAggregation) => ({
    date: format(new Date(dateAggregation.date), "yyyy-MM-dd"),
    sales: dateAggregation.total_sales,
    orders: dateAggregation.total_orders,
  }));
};

export function getLatestSales(
  aggregatedByDate: DateAggregation[]
): AnalyticsData[] {
  const latestSalesData: AnalyticsData[] = [];

  // Iterate from the end of the array (most recent entries first)
  for (let i = aggregatedByDate.length - 1; i >= 0; i--) {
    const dateAggregation = aggregatedByDate[i];

    if (latestSalesData.length >= 10) {
      break; // Stop processing if the collection is already sufficient
    }

    // Check items in the current date aggregation, assuming they are sorted most recent first
    for (const item of dateAggregation.items) {
      if (latestSalesData.length >= 10) {
        break;
      }
      latestSalesData.push(item);
    }
  }

  return latestSalesData;
}
