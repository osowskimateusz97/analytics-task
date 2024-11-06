import { Brand, ChannelName } from "./appConfig";

export interface Base {
  date: string;
  channel_type: string;
  status_id: number;
  sum_sales: number;
  count_orders: number;
}

export interface ApiResponse extends Base {
  channel_name?: Exclude<ChannelName, "Unknown">;
}

export interface AnalyticsData extends Base {
  channel_name: ChannelName;
  brandLogo: string;
  brandName: string;
}

export interface DateAggregation {
  date: string;
  total_sales: number;
  total_orders: number;
  items: AnalyticsData[];
}

export interface ChannelAggregation {
  channelName: ChannelName;
  brandName: Brand;
  total_sales: number;
  total_orders: number;
  items: AnalyticsData[];
}

export interface MappedAnalyticsData {
  aggregatedByChannel: ChannelAggregation[];
  aggregatedByDate: DateAggregation[];
}
