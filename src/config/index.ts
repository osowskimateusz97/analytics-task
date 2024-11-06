import { datePickerConfig } from "./datePickerConfig";
import { brandConfig } from "./brandConfig";
import { AppConfig } from "@/types/appConfig";

export const appConfig: Readonly<AppConfig> = {
  datePicker: datePickerConfig,
  brand: brandConfig,
};
