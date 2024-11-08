import { ChartConfig } from "@/components/ui/chart";
import { PieChartElement } from "@/components/ui/charts/pie-chart";
import { ChannelAggregation, DateAggregation } from "@/types/analytics";
import { format, parseISO } from "date-fns";
import { getBrandColor, getBrandName } from "../config";

// TODO: Think about aggregating smaller numbers into one big chunk
// You can set a minimum threshold when new item should be created
export const getPieChartData = (
  channelAggregatedData: ChannelAggregation[],
  type: "total_orders" | "total_sales"
): PieChartElement[] => {
  const data = channelAggregatedData.map((data) => ({
    brand: data.brand_name,
    brandColor: data.brand_color,
    channel_name: data.channel_name,
    value: data[type],
  }));

  return data;
};

export type ChartData = {
  date: string;
} & {
  [key: string]: string | number;
};

export const processLineChartData = (
  data: DateAggregation[],
  type: "sum_sales" | "sum_orders"
): ChartData[] => {
  const result = data.map((day) => {
    // Initialize the object with a formatted date
    const dayData: ChartData = {
      date: format(parseISO(day.date), "yyyy-MM-dd"),
    };

    // Add sales figures under appropriate channel names
    day.items.forEach(({ channel_name, sum_sales, count_orders }) => {
      const aggregator = type === "sum_orders" ? count_orders : sum_sales;
      dayData[channel_name] =
        ((dayData[channel_name] as number) || 0) + aggregator; // sum up sales by channel
    });

    return dayData;
  });
  return result;
};

export const getChartConfig = (data: ChannelAggregation[]): ChartConfig => {
  return data.reduce((acc, el) => {
    const brand = getBrandName(el.channel_name);
    const color = getBrandColor(brand);

    acc[el.channel_name] = {
      label: brand,
      color,
    };
    return acc;
  }, {} as ChartConfig);
};
