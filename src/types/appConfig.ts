export interface AppConfig {
  datePicker: Readonly<DateRange>;
  brandImages: Readonly<Record<Brand, string>>;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export type ChannelName =
  | "[allegro-pl]"
  | "[shoper_rest]"
  | "[presta]"
  | "[ebay de]"
  | "[shopify_v2]"
  | "unknown";

export type Brand =
  | "Allegro"
  | "Shoper"
  | "Presta"
  | "Ebay"
  | "Shopify"
  | "Unknown";
