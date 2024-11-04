import { createContext } from "react";
import { ThemeProviderState } from "./themeProvider";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
