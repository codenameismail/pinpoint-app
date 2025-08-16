import "../global.css";
import React from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)/login" options={{ animation: "none" }} />
        <Stack.Screen name="(auth)/sign-up" options={{ animation: "none" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
