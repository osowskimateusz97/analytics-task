import { ChannelName, Brand } from "@/types/appConfig";

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
