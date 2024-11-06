import { datePickerConfig } from "./datePickerConfig";
import { brandImagesConfig } from "./brandImageConfig";
import { AppConfig } from "@/types/appConfig";

export const appConfig: Readonly<AppConfig> = {
  datePicker: datePickerConfig,
  brandImages: brandImagesConfig,
};
