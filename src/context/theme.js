import { createContext, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(deviceTheme);

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
      color: theme === "light" ? "#000" : "#e2e8f0",
    },
    textSecundary: {
      color: theme === "light" ? "#909090" : "#9ca3af",
    },
    buttonPress: {
      backgroundColor: theme === "light" ? "#000" : "#161b22",
    },
    buttonText: {
      color: theme === "light" ? "#FFF" : "#e2e8f0",
    },
    inputPrimary: {
      borderColor: theme === "light" ? "#000" : "#161b22",
      color: theme === "light" ? "#000" : "#e2e8f0",
    },
    inputSecundary: {
      borderColor: theme === "light" ? "#000" : "#e2e8f0",
      color: theme === "light" ? "#000" : "#e2e8f0",
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, styleTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
