import React, { useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from "react-native";

interface OtpInputsProps {
  setOtpFields: (otp: string[]) => void;
  otpFields: string[];
  verifyOnComplete: (otp: string[]) => void;
}

export default function OtpInputs({
  setOtpFields,
  otpFields,
  verifyOnComplete,
}: OtpInputsProps) {
  const ref = useRef<Array<TextInput | null>>([]);

  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const key = e.nativeEvent.key;
    const copyOtpFields = [...otpFields];

    if (key === "ArrowLeft" && index > 0) {
      ref.current[index - 1]?.focus();
      return;
    }

    if (key === "ArrowRight" && index + 1 < otpFields.length) {
      ref.current[index + 1]?.focus();
      return;
    }

    if (key === "Backspace") {
      copyOtpFields[index] = "";
      setOtpFields(copyOtpFields);
      if (index > 0) ref.current[index - 1]?.focus();
      return;
    }

    if (!isNaN(Number(key))) {
      copyOtpFields[index] = key;
      setOtpFields(copyOtpFields);

      if (index + 1 < otpFields.length) {
        ref.current[index + 1]?.focus();
      } else {
        ref.current[index]?.blur();
        verifyOnComplete(copyOtpFields);
      }
    }
  };

  return (
    <View style={styles.container}>
      {otpFields.map((value, index) => (
        <TextInput
          key={index}
          ref={(el) => (ref.current[index] = el)}
          style={[styles.input, { borderColor: value ? "#FFA500" : "gray" }]}
          value={value}
          onKeyPress={(e) => handleKeyDown(e, index)}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 0.8,
    textAlign: "center",
    borderRadius: 7,
    fontFamily: "SpaceMono",
  },
});
