import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import OtpInputs from "@/components/OtpInputs";
import { ThemedText } from "@/components/ThemedText";
import { generateOtp } from "@/utils/helper";
import { sendOtpMail, signupRequest } from "@/hooks/api/userApi";
import { Toast } from "toastify-react-native";

const OtpVerify = () => {
  const params = useLocalSearchParams();
  // console.log(params);

  const [otpFields, setOtpFields] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30); // Countdown timer in seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [userOpt, setUserOpt] = useState(params.otp);
  const [isVerifing, setIsVerifing] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const resendOtp = async () => {
    try {
      setTimer(30);
      setResendDisabled(true);
      setIsResending(true);
      const userotp = generateOtp();
      const resp = await sendOtpMail({
        email: params?.email,
        otp: userotp,
      });
      console.log(resp);
      Toast.success("Otp Resend to your email successfully");
      setUserOpt(userotp);
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOtp = async (otps: any) => {
    try {
      if (otps === userOpt) {
        setIsVerifing(true);
        const response = await signupRequest({
          email: params?.email,
          full_name: params?.full_name,
          password: params?.password,
        });
        console.log("OTP Entered:", response);
        Toast.success("Signup completed successfully");
        router.replace("/");
      } else {
        Toast.error("Wrong Otp Entered");
        console.log("Wrong OTP");
      }
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setIsVerifing(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Verify OTP</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter the 6-digit code sent to {params.email || "your number"}
        </ThemedText>

        <OtpInputs
          otpFields={otpFields}
          setOtpFields={setOtpFields}
          verifyOnComplete={(copy) => {
            // Call otpVerification function if needed
            handleVerifyOtp(copy.join(""));
          }}
        />

        <ThemedText style={styles.timer}>
          {timer > 0
            ? `Resend OTP in 00:${timer < 10 ? `0${timer}` : timer}s`
            : "Didn't receive OTP?"}
        </ThemedText>

        <TouchableOpacity
          style={[styles.resendButton, resendDisabled && styles.resendDisabled]}
          disabled={resendDisabled}
          onPress={resendOtp}
        >
          <ThemedText style={styles.resendText}>
            {isResending ? "Sending..." : "Resend OTP"}
          </ThemedText>
        </TouchableOpacity>
        {isVerifing && (
          <ThemedView style={styles.modal}>
            <ThemedView style={styles.loader}>
              <ActivityIndicator
                size={Platform.OS === "ios" ? 40 : 60}
                style={{ marginBottom: "10%" }}
              />
              <ThemedText>Verifying....</ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  timer: {
    fontSize: 14,
    color: "red",
    marginTop: 10,
  },
  resendButton: {
    marginTop: "7%",
    paddingHorizontal: "6%",
    paddingVertical: "3%",
    borderRadius: 5,
    backgroundColor: "#FFA500",
  },
  resendDisabled: {
    backgroundColor: "lightgray",
  },
  resendText: {
    color: "white",
    fontSize: 16,
  },
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    borderRadius: 10,
    height: "25%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OtpVerify;
