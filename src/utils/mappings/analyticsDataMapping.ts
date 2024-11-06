import {
  ApiResponse,
  ChannelAggregation,
  DateAggregation,
  MappedAnalyticsData,
} from "@/types/analytics";
import _ from "lodash";
import { getBrandName } from "../getBrandName";
import { appConfig } from "@/config";
import { ChannelName } from "@/types/appConfig";

export const analyticsDataMapping = (
  data: ApiResponse[]
): MappedAnalyticsData => {
  // Using lodash to sort data
  const sortedData = _.sortBy(data, (item) => item.date);

  const channelMap = new Map<string, ChannelAggregation>();
  const dateMap = new Map<string, DateAggregation>();

  _.forEach(sortedData, (item) => {
    aggregateByChannel(channelMap, item);
    aggregateByDate(dateMap, item);
  });

  return {
    aggregatedByChannel: _.values([...channelMap.values()]),
    aggregatedByDate: _.values([...dateMap.values()]),
  };
};

const aggregateByChannel = (
  channelMap: Map<string, ChannelAggregation>,
  item: ApiResponse
): ChannelAggregation => {
  const channelName = item.channel_name || "unknown";
  let channelAggregation = channelMap.get(channelName);

  if (!channelAggregation) {
    channelAggregation = initializeChannelAggregation(channelName);
    channelMap.set(channelName, channelAggregation);
  }
  const brandName = getBrandName(channelName);
  const brandLogo = appConfig.brandImages[brandName];
  channelAggregation.total_sales += item.sum_sales;
  channelAggregation.total_orders += item.count_orders;
  channelAggregation.items.push({
    ...item,
    channel_name: channelName,
    brandLogo,
    brandName,
  });

  return channelAggregation;
};

const aggregateByDate = (
  dateMap: Map<string, DateAggregation>,
  item: ApiResponse
): DateAggregation => {
  const { date, channel_name } = item;
  const channelName = channel_name || "unknown";
  let dateAggregation = dateMap.get(date);

  if (!dateAggregation) {
    dateAggregation = initializeDateAggregation(date);
    dateMap.set(date, dateAggregation);
  }

  const brandName = getBrandName(channelName);
  const brandLogo = appConfig.brandImages[brandName];
  dateAggregation.total_sales += item.sum_sales;
  dateAggregation.total_orders += item.count_orders;
  dateAggregation.items.push({
    ...item,
    channel_name: channelName,
    brandLogo,
    brandName,
  });

  return dateAggregation;
};

const initializeChannelAggregation = (
  channelName: ChannelName
): ChannelAggregation => {
  return {
    channelName: channelName,
    brandName: getBrandName(channelName),
    total_sales: 0,
    total_orders: 0,
    items: [],
  };
};

const initializeDateAggregation = (date: string): DateAggregation => {
  return {
    date: date,
    total_sales: 0,
    total_orders: 0,
    items: [],
  };
};
