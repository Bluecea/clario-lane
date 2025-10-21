import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, themekey, UserThemeSchema, type UserTheme } from ".";

type ThemeProviderProps = {
  children: ReactNode;
};

const getStoredUserTheme = () => {
  const storedTheme = localStorage.getItem(themekey);
  return UserThemeSchema.parse(storedTheme || "system");
};

const setStoredTheme = (theme: UserTheme) => {
  const validatedTheme = UserThemeSchema.parse(theme);
  localStorage.setItem(themekey, validatedTheme);
};

const getSystemTheme = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
};

const handleThemeChange = (userTheme: UserTheme) => {
  const validatedTheme = UserThemeSchema.parse(userTheme);

  const root = document.documentElement;
  root.classList.remove("light", "dark", "system");

  if (validatedTheme === "system") {
    const systemTheme = getSystemTheme();
    root.classList.add(systemTheme, "system");
  } else {
    root.classList.add(validatedTheme);
  }
};

const setupPreferredListener = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => handleThemeChange("system");
  mediaQuery.addEventListener("change", handler);
  return () => mediaQuery.removeEventListener("change", handler);
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredUserTheme);

  useEffect(() => {
    if (userTheme !== "system") return;
    return setupPreferredListener();
  }, [userTheme]);

  const setTheme = (newUserTheme: UserTheme) => {
    const validatedTheme = UserThemeSchema.parse(newUserTheme);
    setUserTheme(validatedTheme);
    setStoredTheme(validatedTheme);
    handleThemeChange(validatedTheme);
  };

  return (
    <ThemeContext value={{ userTheme, setTheme }}>{children}</ThemeContext>
  );
}
