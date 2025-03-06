import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "expo-router";
import PasswordInputField from "@/components/PasswordInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    console.log("Login button pressed", email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {/* <View style={styles.header}>
          <Image source={Logo} style={{ height: 240, width: 200 }} />
        </View> */}

        <ThemedView style={styles.welcomeContainer}>
          <ThemedText style={styles.welcomeTitle}>Welcome Back!</ThemedText>
          <ThemedText style={styles.subtitle}>Login to continue</ThemedText>
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedView>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              placeholder="Enter your email"
              cursorColor="black"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </ThemedView>
          <PasswordInputField value={password} onChangeText={setPassword} />
        </ThemedView>

        <View style={styles.optionsContainer}>
          <ThemedText style={styles.forgotPassword}>
            Forget password?
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          disabled={isLoading}
          onPress={handleLogin}
        >
          <ThemedText style={styles.loginButtonText}>
            {isLoading ? "Logging in..." : "Login"}
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <ThemedText style={styles.optionText}>
            Don’t have an account?{" "}
          </ThemedText>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("signup")}
          >
            <ThemedText style={styles.signUpText}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "6%",
    paddingTop: "30%",
  },
  header: {
    alignItems: "center",
    marginVertical: "4%",
  },
  title: {
    fontSize: 24,
    marginTop: "3%",
  },
  welcomeContainer: {
    marginBottom: "6%",
    marginTop: "10%",
  },
  welcomeTitle: {
    fontSize: 28,
    marginBottom: "1%",
  },
  subtitle: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: "6%",
  },
  label: {
    marginBottom: "2%",
    marginLeft: "3%",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    color: "black",
    fontFamily: "SpaceMono",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "6%",
  },
  optionText: {
    fontSize: 14,
  },
  forgotPassword: {
    color: "#FFA500",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#FFA500",
    paddingVertical: "4%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6%",
  },
  loginButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "#FFA500",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default LoginScreen;
