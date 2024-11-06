import { Analytics, RawChannelName } from "@/schemas/analytics";
import { Brand } from "./appConfig";

export type ChannelName = Exclude<RawChannelName, ""> | "unknown";

export interface AnalyticsData extends Omit<Analytics, "channel_name"> {
  channel_name: ChannelName;
  brand_logo: string;
  brand_name: string;
}

export interface DateAggregation {
  date: string;
  total_sales: number;
  total_orders: number;
  items: AnalyticsData[];
}

export interface ChannelAggregation {
  channel_name: ChannelName;
  brand_name: Brand;
  brand_color: string;
  total_sales: number;
  total_orders: number;
  items: AnalyticsData[];
}

export interface MappedAnalyticsData {
  aggregatedByChannel: ChannelAggregation[];
  aggregatedByDate: DateAggregation[];
}
