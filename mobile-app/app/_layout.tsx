import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import "react-native-reanimated";
import Container, { Toast } from "toastify-react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Dimensions } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navRef = useRef(null);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Typo_Round_Regular_Demo: require("../assets/fonts/Typo_Round_Regular_Demo.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade", // Fade transition
            animationTypeForReplace: "push", // Use "pop" or "push"
            gestureEnabled: true, // Enable swipe back gesture on iOS
          }}
        >
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="otp-verify" />
          <Stack.Screen name="create-task" />
          <Stack.Screen name="edit-task" />
          <Stack.Screen name="view-task" />
          <Stack.Screen name="forget-password" />
          <Stack.Screen name="reset-password" />
        </Stack>
        <StatusBar style="auto" />
        <Container
          width={Dimensions.get("window").width * 0.9}
          height={50}
          positionValue={25}
          showCloseIcon={false}
          animationStyle="upInUpOut"
          textStyle={{
            fontSize: 14,
            fontFamily: "SpaceMono",
            textTransform: "capitalize",
          }}
        />
      </ThemeProvider>
    </Provider>
  );
}
