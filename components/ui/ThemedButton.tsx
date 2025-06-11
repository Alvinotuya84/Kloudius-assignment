import { useTheme } from "@/hooks/useTheme.hook";
import React, { ReactNode } from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    ViewStyle
} from "react-native";
import Box from "./Box";
import ThemedText from "./ThemedText";

interface ThemedButtonProps extends PressableProps {
  children: ReactNode;
  type?: "primary" | "secondary" | "text" | "outline";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  radius?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mx?: number;
  my?: number;
  pa?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
}

const ThemedButton = ({
  children,
  type = "primary",
  size = "md",
  block = false,
  loading = false,
  disabled = false,
  color,
  textColor,
  style,
  textStyle,
  radius = 8,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  pa,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  ...props
}: ThemedButtonProps) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    const baseStyle: ViewStyle = {
      borderRadius: radius,
      opacity: disabled ? 0.5 : 1,
    };

    const sizeStyles: Record<string, ViewStyle> = {
      sm: {
        paddingVertical: 8,
        paddingHorizontal: 12,
      },
      md: {
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      lg: {
        paddingVertical: 16,
        paddingHorizontal: 20,
      },
    };

    const typeStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: color || theme.primary,
      },
      secondary: {
        backgroundColor: color || theme.secondary,
      },
      text: {
        backgroundColor: "transparent",
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: color || theme.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...typeStyles[type],
      ...style,
    };
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    if (type === "text") return theme.primary;
    if (type === "outline") return theme.primary;
    return "#FFFFFF";
  };

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyles(),
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      disabled={disabled || loading}
      {...props}
    >
      <Box
        direction="row"
        align="center"
        justify="center"
        gap={8}
        block={block}
        mt={mt}
        mb={mb}
        ml={ml}
        mr={mr}
        mx={mx}
        my={my}
        pa={pa}
        px={px}
        py={py}
        pt={pt}
        pb={pb}
        pl={pl}
        pr={pr}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color={getTextColor()}
            style={{ marginRight: 8 }}
          />
        )}
        {typeof children === "string" ? (
          <ThemedText
            color={getTextColor()}
            size={size === "sm" ? "sm" : "md"}
            style={textStyle}
          >
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </Box>
    </Pressable>
  );
};

export default ThemedButton; 