import { scale } from "@/constants/scaler.constants";
import { useTheme } from "@/hooks/useTheme.hook";
import React, { ReactNode } from "react";
import { Text, TextProps, TextStyle } from "react-native";

const ThemedText = ({
  style,
  size = "md",
  color,
  weight = "normal",
  fontWeight,
  align = "auto",
  lineHeight,
  textDecorationLine,
  textDecorationColor,
  textDecorationStyle,
  textTransform,
  fontStyle,
  textShadowOffset,
  textShadowRadius,
  textShadowColor,
  includeFontPadding,
  fontFamily = "AnekDevanagari_",
  fontVariant,
  letterSpacing,
  darkModeColor,
  textProps,
  children,
}: ThemedTextProps) => {
  const theme = useTheme();

  const textSize = () => {
    if (typeof size === "string") {
      const foundSize = textSizes.find((options) => options.size === size);
      if (!foundSize)
        return textSizes.find((options) => options.size === "md")!.value;
      return foundSize.value;
    } else {
      return size;
    }
  };

  return (
    <Text
      style={{
        color: color ? color : darkModeColor ? darkModeColor : theme.text,
        fontSize: textSize(),
        fontWeight: weight,
        width: "auto",
        textAlign: align,
        lineHeight,
        textDecorationLine,
        textDecorationColor,
        textDecorationStyle,
        textTransform,
        fontStyle,
        textShadowOffset,
        textShadowRadius,
        textShadowColor,
        includeFontPadding,
        fontFamily: fontWeight
          ? mapFontweightToFontFamily(fontWeight)
          : fontFamily,
        fontVariant,
        letterSpacing,
        ...style,
      }}
      {...textProps}
    >
      {children}
    </Text>
  );
};

export default ThemedText;

function mapFontweightToFontFamily(
  weight: FontWeight,
  fontPrefix = "AnekDevanagari_"
) {
  switch (weight) {
    case "extralight":
      return `${fontPrefix}200ExtraLight`;
    case "light":
      return `${fontPrefix}100Thin`;
    case "regular":
      return `${fontPrefix}500Medium`;
    case "semibold":
      return `${fontPrefix}600SemiBold`;
    case "bold":
      return `${fontPrefix}700Bold`;
    case "extrabold":
      return `${fontPrefix}800ExtraBold`;
    default:
      return `${fontPrefix}`;
  }
}

const textSizes = [
  { size: "xxxs", value: scale(8) },
  { size: "xxs", value: scale(10) },
  { size: "xs", value: scale(12) },
  { size: "sm", value: scale(14) },
  { size: "md", value: scale(16) },
  { size: "lg", value: scale(18) },
  { size: "xl", value: scale(20) },
  { size: "xxl", value: scale(24) },
  { size: "xxxl", value: scale(28) },
] as const;

export type TextSize = (typeof textSizes)[number]["size"];

export interface ThemedTextProps {
  color?: TextStyle["color"];
  style?: TextStyle;
  size?: TextStyle["fontSize"] | TextSize;
  weight?: TextStyle["fontWeight"];
  align?: TextStyle["textAlign"];
  lineHeight?: TextStyle["lineHeight"];
  textDecorationLine?: TextStyle["textDecorationLine"];
  textDecorationStyle?: TextStyle["textDecorationStyle"];
  textDecorationColor?: TextStyle["textDecorationColor"];
  textTransform?: TextStyle["textTransform"];
  fontStyle?: TextStyle["fontStyle"];
  textShadowOffset?: TextStyle["textShadowOffset"];
  textShadowRadius?: TextStyle["textShadowRadius"];
  textShadowColor?: TextStyle["textShadowColor"];
  includeFontPadding?: TextStyle["includeFontPadding"];
  fontFamily?: TextStyle["fontFamily"];
  fontVariant?: TextStyle["fontVariant"];
  letterSpacing?: TextStyle["letterSpacing"];
  fontWeight?: FontWeight;
  darkModeColor?: TextStyle["color"];
  icon?: {
    name: any;
    position?: "append" | "prepend";
    size?: number;
    color?: string;
    gap?: number;
  };
  textProps?: TextProps;
  children?: ReactNode;
}

export type FontWeight =
  | "extralight"
  | "light"
  | "regular"
  | "semibold"
  | "extrabold"
  | "bold"
  | "black"; 