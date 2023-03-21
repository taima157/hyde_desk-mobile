import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState("light");

  async function toggleTheme() {
    let changeTheme = theme === "light" ? "dark" : "light";

    setTheme(changeTheme);
    await AsyncStorage.setItem("theme", changeTheme);
  }

  async function getLocalTheme() {
    const themeLocal = await AsyncStorage.getItem("theme");

    if (themeLocal !== null) {
      setTheme(themeLocal);
    } else {
      setTheme(colorScheme);
      await AsyncStorage.setItem("theme", colorScheme);
    }
  }

  useEffect(() => {
    getLocalTheme();
  }, []);

  const styleTheme = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? "#FFF" : "#0d1117",
    },
    containerSecundary: {
      backgroundColor: theme === "light" ? "#f8fafc" : "#1f2937",
    },
    textPrimary: {
      color: theme === "light" ? "#000" : "#e2e8f0",
    },
    textSecundary: {
      color: theme === "light" ? "#909090" : "#9ca3af",
    },
    buttonPress: {
      backgroundColor: theme === "light" ? "#000" : "#1f2937",
    },
    buttonText: {
      color: theme === "light" ? "#FFF" : "#e2e8f0",
    },
    inputPrimary: {
      borderColor: theme === "light" ? "#000" : "#1f2937",
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
