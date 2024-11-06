import { z } from "zod";

const RawChannelName = z.union([
  z.literal("[allegro-pl]"),
  z.literal("[shoper_rest]"),
  z.literal("[presta]"),
  z.literal("[ebay de]"),
  z.literal("[shopify_v2]"),
  z.literal(""),
]);

export const AnalyticSchema = z.object({
  date: z.string().date(),
  channel_type: z.string(),
  status_id: z.number(),
  sum_sales: z.number(),
  count_orders: z.number(),
  channel_name: RawChannelName,
});

export const AnalyticCollectionSchema = z.array(AnalyticSchema);

export type Analytics = z.infer<typeof AnalyticSchema>;

export type AnalyticsCollection = Array<Analytics>;

export type RawChannelName = z.infer<typeof RawChannelName>;
