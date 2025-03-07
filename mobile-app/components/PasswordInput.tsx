import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ThemedInput } from "./ThemedInput";

interface PasswordInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  isError?: boolean;
  errorMessage?: any;
  placeholder?: string;
  title?: string;
  onFocus: () => void;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  value,
  onChangeText,
  isError = false,
  errorMessage = "",
  placeholder = "Enter your password",
  title = "Password",
  onFocus = () => {},
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ThemedView>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedView
        style={[styles.inputContainer, isError && styles.errorBorder]}
      >
        <ThemedInput
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          cursorColor="black"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <ThemedText style={styles.toggleText}>
            {isPasswordVisible ? "hide" : "show"}
          </ThemedText>
        </TouchableOpacity>
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
  toggleText: {
    color: "black",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    marginLeft: 12,
    marginTop: 4,
    fontSize: 13,
  },
});

export default PasswordInputField;
