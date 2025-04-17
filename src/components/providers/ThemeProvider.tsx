import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initializeState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext(initializeState);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function initializeTheme() {
    const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const localStorageTheme = localStorage.getItem("theme");
    console.log(localStorageTheme);

    let theme: Theme;
    if (localStorageTheme !== null) {
      theme = localStorageTheme as Theme;
      return theme;
    }

    if (systemDarkTheme.matches === true) {
      return "dark";
    }
    return "light";
  }

  function renderTheme(newTheme: Theme) {
    document.querySelector("html")?.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const [theme, setTheme] = useState<Theme>(
    () => (initializeTheme() as Theme) || "dark"
  );

  useEffect(() => {
    renderTheme(theme);
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
