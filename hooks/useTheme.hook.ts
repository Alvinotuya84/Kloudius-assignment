import { useColorScheme } from "react-native";

interface Theme {
  primary: string;
  primary2: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

const lightTheme: Theme = {
  primary: "#007AFF",
  primary2: "#5856D6",
  secondary: "#5856D6",
  background: "#FFFFFF",
  text: "#000000",
  border: "#E5E5EA",
  error: "#FF3B30",
  success: "#34C759",
  warning: "#FF9500",
  info: "#5856D6",
};

const darkTheme: Theme = {
  primary: "#0A84FF",
  primary2: "#5E5CE6",
  secondary: "#5E5CE6",
  background: "#000000",
  text: "#FFFFFF",
  border: "#38383A",
  error: "#FF453A",
  success: "#32D74B",
  warning: "#FF9F0A",
  info: "#5E5CE6",
};

export function useTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? darkTheme : lightTheme;
} 