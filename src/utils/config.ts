import { appConfig } from "@/config";
import { ChannelName } from "@/types/analytics";
import { Brand } from "@/types/appConfig";

export const getBrandLogo = (brand: Brand) => appConfig.brand.logos[brand];

export const getBrandColor = (brand: Brand) => appConfig.brand.colors[brand];

export const getBrandName = (channel_name: ChannelName): Brand => {
  const channels: Record<ChannelName, Brand> = {
    "[allegro-pl]": "Allegro",
    "[shoper_rest]": "Shoper",
    "[ebay de]": "Ebay",
    "[presta]": "Presta",
    "[shopify_v2]": "Shopify",
    unknown: "Unknown",
  };

  return channels[channel_name];
};
