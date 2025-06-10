import { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  isLightTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderCustom({ children }: { children: ReactNode }) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => setIsLightTheme(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeCustom() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeCustom must be used inside ThemeProviderCustom");
  return context;
}