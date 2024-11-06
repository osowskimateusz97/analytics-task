import { BrandConfig } from "@/config/brandConfig";

export interface AppConfig {
  datePicker: Readonly<DateRange>;
  brand: BrandConfig;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export type Brand =
  | "Allegro"
  | "Shoper"
  | "Presta"
  | "Ebay"
  | "Shopify"
  | "Unknown";
