import _ from "lodash";
import { format } from "date-fns";
import { formatCurrencyPLN, formatNumber } from "./currencyFormatting";
import {
  AnalyticsData,
  DateAggregation,
  MappedAnalyticsData,
} from "@/types/analytics";
import { Brand } from "@/types/appConfig";
import { appConfig } from "@/config";

export const getTotalSales = (
  preprocessedData: MappedAnalyticsData
): string => {
  const totalSales = preprocessedData.aggregatedByChannel.reduce(
    (acc, channel) => acc + channel.total_sales,
    0
  );
  return formatCurrencyPLN(totalSales);
};

export const getTotalOrders = (
  preprocessedData: MappedAnalyticsData
): string => {
  const total = preprocessedData.aggregatedByChannel.reduce(
    (acc, channel) => acc + channel.total_orders,
    0
  );
  const formattedTotalOrders = formatNumber(total);
  return formattedTotalOrders;
};

export const getTopSaler = (
  preprocessedData: MappedAnalyticsData
): { brandName: Brand | "Unknown"; totalSales: string; logo: string } => {
  const topSaler = preprocessedData.aggregatedByChannel.reduce(
    (max, curr) => (max.total_sales > curr.total_sales ? max : curr),
    preprocessedData.aggregatedByChannel[0]
  );
  return {
    brandName: topSaler.brandName,
    logo: appConfig.brandImages[topSaler.brandName],
    totalSales: topSaler ? formatCurrencyPLN(topSaler.total_sales) : "0",
  };
};

export const getTopOrder = (
  preprocessedData: MappedAnalyticsData
): { brandName: Brand; totalOrders: number; logo: string } => {
  const topOrder = preprocessedData.aggregatedByChannel.reduce(
    (max, curr) => (max.total_orders > curr.total_orders ? max : curr),
    preprocessedData.aggregatedByChannel[0]
  );
  return {
    brandName: topOrder.brandName,
    logo: appConfig.brandImages[topOrder.brandName],
    totalOrders: topOrder ? topOrder.total_orders : 0,
  };
};

export const getTopPerformingDay = (
  preprocessedData: MappedAnalyticsData
): string => {
  const mostSalesDayObj = preprocessedData.aggregatedByDate.reduce(
    (max, curr) => (max.total_sales > curr.total_sales ? max : curr),
    preprocessedData.aggregatedByDate[0]
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
