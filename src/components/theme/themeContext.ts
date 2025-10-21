import { createContext } from "react";
import { z } from "zod";

export const UserThemeSchema = z
  .enum(["light", "dark", "system"])
  .catch("system");

export const themekey = "theme";
export type UserTheme = z.infer<typeof UserThemeSchema>;

export type ThemeContextProps = {
  userTheme: UserTheme;
  setTheme: (theme: UserTheme) => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);
