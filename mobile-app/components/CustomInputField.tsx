import React from "react";
import { TextInput, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ThemedInput } from "./ThemedInput";

interface PasswordInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  isError?: boolean;
  errorMessage?: any;
  placeholder?: string;
  title?: string;
  isMultiLine?: boolean;
  containerStyle?: ViewStyle; // ✅ Added containerStyle prop
}

const CustomInputField: React.FC<PasswordInputFieldProps> = ({
  value,
  onChangeText,
  isError = false,
  errorMessage = "",
  placeholder = "Enter your placeholder",
  title = "Your title",
  onFocus,
  isMultiLine,
  containerStyle, // ✅ Receive containerStyle prop
  ...rest
}) => {
  return (
    <ThemedView>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedView
        style={[
          styles.inputContainer,
          isError && styles.errorBorder,
          containerStyle, // ✅ Apply custom styles here
        ]}
      >
        <ThemedInput
          placeholder={placeholder}
          cursorColor="black"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          multiline={isMultiLine}
          {...rest}
        />
      </ThemedView>
      {isError && (
        <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 8,
    marginLeft: 12,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: "5%",
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    color: "black",
    paddingVertical: "6%",
    fontFamily: "SpaceMono",
  },
  errorText: {
    color: "red",
    marginLeft: 12,
    marginTop: 4,
    fontSize: 13,
  },
});

export default CustomInputField;
