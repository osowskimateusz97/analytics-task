import _ from "lodash";
import {
  ChannelAggregation,
  ChannelName,
  DateAggregation,
  MappedAnalyticsData,
} from "@/types/analytics";
import {
  Analytics,
  AnalyticsCollection,
  RawChannelName,
} from "@/schemas/analytics";
import { getBrandColor, getBrandLogo, getBrandName } from "../config";

export const analyticsDataMapping = (
  data: AnalyticsCollection
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
  item: Analytics
): ChannelAggregation => {
  const channel_name = getMappedChannelName(item.channel_name);
  let channelAggregation = channelMap.get(channel_name);

  if (!channelAggregation) {
    channelAggregation = initializeChannelAggregation(channel_name);
    channelMap.set(channel_name, channelAggregation);
  }
  const brand_name = getBrandName(channel_name);
  const brand_logo = getBrandLogo(brand_name);
  const brand_color = getBrandColor(brand_name);

  channelAggregation.total_sales += item.sum_sales;
  channelAggregation.total_orders += item.count_orders;
  channelAggregation.brand_color = brand_color;
  channelAggregation.items.push({
    ...item,

    channel_name,
    brand_logo,
    brand_name,
  });

  return channelAggregation;
};

const aggregateByDate = (
  dateMap: Map<string, DateAggregation>,
  item: Analytics
): DateAggregation => {
  const channel_name = getMappedChannelName(item.channel_name);

  const { date } = item;

  let dateAggregation = dateMap.get(date);

  if (!dateAggregation) {
    dateAggregation = initializeDateAggregation(date);
    dateMap.set(date, dateAggregation);
  }

  const brand_name = getBrandName(channel_name);
  const brand_logo = getBrandLogo(brand_name);
  dateAggregation.total_sales += item.sum_sales;
  dateAggregation.total_orders += item.count_orders;
  dateAggregation.items.push({
    ...item,
    channel_name,
    brand_logo,
    brand_name,
  });

  return dateAggregation;
};

const initializeChannelAggregation = (
  channel_name: ChannelName
): ChannelAggregation => {
  const brandName = getBrandName(channel_name);
  return {
    channel_name,
    brand_color: getBrandColor(brandName),
    brand_name: brandName,
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

const getMappedChannelName = (channel_name: RawChannelName): ChannelName =>
  channel_name === "" ? "unknown" : channel_name;
