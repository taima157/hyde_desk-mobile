import { createContext, useState } from "react";
import { StyleSheet } from "react-native";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const styleTheme = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? "#FFF" : "#0d1117",
    },
    containerSecundary: {
      backgroundColor: theme === "light" ? "#FFF" : "#161b22",
    },
    textPrimary: {
      color: theme === "light" ? "#000" : "#f0f6fc",
    },
    textSecundary: {
      color: theme === "light" ? "#000" : "#C9d1d9",
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, styleTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
