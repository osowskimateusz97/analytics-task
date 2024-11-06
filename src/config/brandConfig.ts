import Allegro from "@/assets/logos/allegro.png";
import Shoper from "@/assets/logos/shoper.webp";
import Ebay from "@/assets/logos/Ebay.webp";
import Presta from "@/assets/logos/presta.png";
import Shopify from "@/assets/logos/presta.png";
import Unknown from "@/assets/logos/fallbackLogo.png";
import { Brand } from "@/types/appConfig";

export interface BrandConfig {
  logos: Record<Brand, string>;
  colors: Record<Brand, string>;
}

export const brandConfig: BrandConfig = {
  logos: {
    Allegro,
    Shoper,
    Ebay,
    Presta,
    Shopify,
    Unknown,
  },
  colors: {
    Allegro: "#FF5A00",
    Ebay: "#EBA816",
    Presta: "#DB096C",
    Shoper: "#002FF7",
    Shopify: "#91B944",
    Unknown: "#A5A7AB",
  },
};
