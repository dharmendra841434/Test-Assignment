import { TextInput, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedInputProps = TextInputProps & {
  lightTextColor?: string;
  darkTextColor?: string;
  lightPlaceholderColor?: string;
  darkPlaceholderColor?: string;
};

export function ThemedInput({
  style,
  lightTextColor,
  darkTextColor,
  lightPlaceholderColor,
  darkPlaceholderColor,
  ...otherProps
}: ThemedInputProps) {
  const color = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    "text"
  );
  const placeholderTextColor = useThemeColor(
    { light: lightPlaceholderColor, dark: darkPlaceholderColor },
    "placeholder"
  );

  return (
    <TextInput
      style={[{ color }, style]}
      placeholderTextColor={placeholderTextColor}
      {...otherProps}
    />
  );
}
