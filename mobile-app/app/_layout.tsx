import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
