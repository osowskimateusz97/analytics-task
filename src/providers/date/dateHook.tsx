import { useContext } from "react";
import { DateContext } from "./dateContext";

// Custom Hook for accessing and updating the date range
export const useDateRange = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateProvider");
  }
  return context;
};
