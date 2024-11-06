import { PieChartElement } from "@/components/ui/charts/pie-chart";
import { ChannelAggregation } from "@/types/analytics";

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
