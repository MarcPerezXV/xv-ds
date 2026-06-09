// provider/DSProvider.tsx
import { ReactNode, useEffect } from "react";
import { DSContext, defaultLocale } from "./DSContext";
import { DSLocale } from "./types";

export type DSTheme = "light" | "dark" | "system";

export interface DSProviderProps {
  children: ReactNode;
  locale?: DSLocale;
  theme?: DSTheme;
}

const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const DSProvider = ({ children, locale, theme }: DSProviderProps) => {
  useEffect(() => {
    if (!theme) return;

    const applyTheme = (t: "light" | "dark") => {
      document.documentElement.setAttribute("data-theme", t);
    };

    if (theme === "system") {
      applyTheme(getSystemTheme());

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }

    applyTheme(theme);
  }, [theme]);

  return (
    <DSContext.Provider
      value={{
        locale: { ...defaultLocale, ...locale },
      }}
    >
      {children}
    </DSContext.Provider>
  );
};

DSProvider.displayName = "DSProvider";