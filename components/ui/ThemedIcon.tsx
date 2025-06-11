import { useTheme } from "@/hooks/useTheme.hook";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import React, { Component, LegacyRef, forwardRef } from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

type IconGlyphKeys =
  | keyof (typeof AntDesign)["glyphMap"]
  | keyof (typeof Entypo)["glyphMap"]
  | keyof (typeof EvilIcons)["glyphMap"]
  | keyof (typeof FontAwesome)["glyphMap"]
  | keyof (typeof Fontisto)["glyphMap"]
  | keyof (typeof Foundation)["glyphMap"]
  | keyof (typeof Ionicons)["glyphMap"]
  | keyof (typeof MaterialCommunityIcons)["glyphMap"]
  | keyof (typeof MaterialIcons)["glyphMap"]
  | keyof (typeof Octicons)["glyphMap"]
  | keyof (typeof SimpleLineIcons)["glyphMap"]
  | keyof (typeof Zocial)["glyphMap"];

const iconSizes = [
  { size: "xxxs", value: 10 },
  { size: "xxs", value: 12 },
  { size: "xs", value: 14 },
  { size: "sm", value: 16 },
  { size: "md", value: 18 },
  { size: "lg", value: 20 },
  { size: "xl", value: 22 },
  { size: "xxl", value: 24 },
  { size: "xxxl", value: 26 },
] as const;

type TextSize = (typeof iconSizes)[number]["size"];

export type ThemedIconRef = LegacyRef<Component<IconProps<any>>> | undefined;

export interface ThemedIconProps {
  source?:
    | "AntDesign"
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "FontAwesome"
    | "FontAwesome5"
    | "FontAwesome6"
    | "Fontisto"
    | "Foundation"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "Octicons"
    | "SimpleLineIcons"
    | "Zocial";
  name: IconGlyphKeys;
  size?: number | TextSize;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle> | undefined;
  testID?: string;
}

const ThemedIcon = forwardRef<Component<IconProps<any>>, ThemedIconProps>(
  ({ name, color, size = "md", source = "Feather", style, testID }, ref) => {
    const iconSize = () => {
      if (typeof size === "string") {
        return iconSizes.find((options) => options.size === size)?.value ?? 18;
      }
      return size;
    };

    const theme = useTheme();

    const iconProps = {
      ref,
      size: iconSize(),
      color: color ?? theme.text,
      style,
      testID,
    };

    switch (source) {
      case "Feather":
        return <Feather {...iconProps} name={name as keyof typeof Feather.glyphMap} />;
      case "AntDesign":
        return <AntDesign {...iconProps} name={name as keyof typeof AntDesign.glyphMap} />;
      case "Entypo":
        return <Entypo {...iconProps} name={name as keyof typeof Entypo.glyphMap} />;
      case "EvilIcons":
        return <EvilIcons {...iconProps} name={name as keyof typeof EvilIcons.glyphMap} />;
      case "FontAwesome":
        return <FontAwesome {...iconProps} name={name as keyof typeof FontAwesome.glyphMap} />;
      case "FontAwesome5":
        return <FontAwesome5 {...iconProps} name={name as keyof typeof FontAwesome5.glyphMap} />;
      case "FontAwesome6":
        return <FontAwesome6 {...iconProps} name={name as keyof typeof FontAwesome6.glyphMap} />;
      case "Fontisto":
        return <Fontisto {...iconProps} name={name as keyof typeof Fontisto.glyphMap} />;
      case "Foundation":
        return <Foundation {...iconProps} name={name as keyof typeof Foundation.glyphMap} />;
      case "Ionicons":
        return <Ionicons {...iconProps} name={name as keyof typeof Ionicons.glyphMap} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons {...iconProps} name={name as keyof typeof MaterialCommunityIcons.glyphMap} />;
      case "MaterialIcons":
        return <MaterialIcons {...iconProps} name={name as keyof typeof MaterialIcons.glyphMap} />;
      case "Octicons":
        return <Octicons {...iconProps} name={name as keyof typeof Octicons.glyphMap} />;
      case "SimpleLineIcons":
        return <SimpleLineIcons {...iconProps} name={name as keyof typeof SimpleLineIcons.glyphMap} />;
      case "Zocial":
        return <Zocial {...iconProps} name={name as keyof typeof Zocial.glyphMap} />;
      default:
        return <Feather {...iconProps} name={name as keyof typeof Feather.glyphMap} />;
    }
  }
);

ThemedIcon.displayName = "ThemedIcon";

export default ThemedIcon; 