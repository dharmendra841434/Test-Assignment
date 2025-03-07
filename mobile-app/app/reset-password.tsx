import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import PasswordInputField from "@/components/PasswordInput";
import { Toast } from "toastify-react-native";
import { resetPasswordRequest } from "@/hooks/api/userApi";

const ResetPassword = () => {
  const params = useLocalSearchParams();
  const color = useThemeColor({ light: "#000", dark: "#fff" }, "icon");
  const navigation = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleConfirmPasswordChange = (text: any) => {
    setConfirmPassword(text);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleFocus = (field: any) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleResetPassword = async () => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        newPassword: password,
        email: params?.email,
      };
      const response = await resetPasswordRequest(payload);
      setPassword("");
      setConfirmPassword("");
      Toast.success("Password reset successfully");
      navigation.replace("/");
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.replace("/forget-password")}
        >
          <Ionicons name="arrow-back" size={24} color={color} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: "4%", paddingTop: "25%" }}>
        <PasswordInputField
          placeholder="Enter password"
          value={password}
          onChangeText={handlePasswordChange}
          isError={!!errors.password}
          errorMessage={errors.password}
          onFocus={() => handleFocus("password")}
        />

        <PasswordInputField
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          isError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          onFocus={() => handleFocus("confirmPassword")}
        />

        <TouchableOpacity
          style={styles.loginButton}
          disabled={isLoading}
          onPress={handleResetPassword}
        >
          <ThemedText style={styles.loginButtonText}>
            {isLoading ? "Reseting..." : "Reset Password"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "15%",
    paddingHorizontal: "4%",
  },
  loginButton: {
    backgroundColor: "#FFA500",
    paddingVertical: "4%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
  loginButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResetPassword;
