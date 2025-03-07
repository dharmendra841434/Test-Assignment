import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomInputField from "@/components/CustomInputField";
import { ThemedText } from "@/components/ThemedText";
import { Toast } from "toastify-react-native";
import { generateOtp } from "@/utils/helper";
import { sendOtpMailforReset } from "@/hooks/api/userApi";

const ForgetPassword = () => {
  const color = useThemeColor({ light: "", dark: "" }, "icon");
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      const userotp = generateOtp();
      const resp = await sendOtpMailforReset({
        email: email,
        otp: userotp,
      });
      console.log(resp);
      Toast.success("Otp send to your email successfully");
      setEmail("");
      navigation.push({
        pathname: "/otp-verify",
        params: { otp: userotp, email: email, type: "reset" },
      });
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "15%",
            paddingHorizontal: "4%",
          }}
        >
          <TouchableOpacity onPress={() => navigation.back()}>
            <Ionicons name="arrow-back" size={24} color={color} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: "4%", paddingTop: "25%" }}>
          <CustomInputField
            value={email}
            placeholder="Enter email"
            onChangeText={setEmail}
            title="Enter your email"
          />
          <TouchableOpacity
            style={styles.loginButton}
            disabled={isLoading}
            onPress={handleSendOtp}
          >
            <ThemedText style={styles.loginButtonText}>
              {isLoading ? "Sending Otp..." : "Send otp"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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

export default ForgetPassword;
