import CustomInputField from "@/components/CustomInputField";
import PasswordInputField from "@/components/PasswordInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";

type NavigationProp = {
  navigate: (screen: string) => void;
};

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // State for form fields
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRegisterLoading, setUserRegisterLoading] = useState(false);

  // Error state
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  // Validation function
  const validateForm = (): boolean => {
    let newErrors: { [key: string]: string } = {};

    if (!email.trim()) newErrors.email = "Email is required.";
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log("asmbdgnagsdhfsahd");
    }
  };

  const handleFocus = (field: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password:
        text.length < 6 ? "Password must be at least 6 characters." : null,
      confirmPassword:
        confirmPassword && text !== confirmPassword
          ? "Passwords do not match."
          : null,
    }));
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: text !== password ? "Passwords do not match." : null,
    }));
  };

  const handleReset = () => {
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    navigation.navigate("login");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ThemedView style={styles.innerContainer}>
          <ThemedView style={styles.welcomeContainer}>
            <ThemedText style={styles.welcomeText}>
              Create Account Now!
            </ThemedText>
            <ThemedText style={styles.subText}>
              Join us and unlock endless possibilities!
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <CustomInputField
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              isError={!!errors.email}
              errorMessage={errors.email}
              title="Email"
              onFocus={() => handleFocus("email")}
            />

            <CustomInputField
              placeholder="Enter full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
              }}
              isError={!!errors.fullName}
              errorMessage={errors.fullName}
              title="Full name"
              onFocus={() => handleFocus("fullName")}
            />

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
              title="Confirm Password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              isError={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              onFocus={() => handleFocus("confirmPassword")}
            />
          </ThemedView>

          <TouchableOpacity
            style={styles.signUpButton}
            disabled={userRegisterLoading}
            onPress={handleRegister}
          >
            <ThemedText style={styles.signUpText}>
              {userRegisterLoading ? "Signing Up..." : "Sign Up"}
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.loginContainer}>
            <ThemedText style={styles.subText}>
              Already have an account?{" "}
            </ThemedText>
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <ThemedText style={styles.loginText}>Login</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flex: 1 },
  innerContainer: { padding: "4%", height: "100%", paddingTop: "10%" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: { fontSize: 25 },
  welcomeContainer: { marginVertical: "6%" },
  welcomeText: { fontSize: 24, marginBottom: 4 },
  subText: {},
  inputContainer: {},
  labelText: { marginBottom: 4 },
  input: {
    backgroundColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    color: "black",
    fontFamily: "SpaceMono",
  },
  label: {
    marginBottom: "2%",
    marginLeft: "3%",
    fontSize: 16,
  },
  errorBorder: { borderColor: "red", borderWidth: 1 },
  errorText: { color: "red", marginTop: 4 },
  signUpButton: {
    backgroundColor: "#FFA500",
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    marginTop: "10%",
  },
  signUpText: { color: "black", fontSize: 16 },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "6%",
  },
  loginText: { color: "#FFA500", textDecorationLine: "underline" },
});

export default RegisterScreen;
