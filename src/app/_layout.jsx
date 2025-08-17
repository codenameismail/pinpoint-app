import "../global.css";
import React from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore, useInitializeAuth } from "../store/authStore";
import { ActivityIndicator } from "react-native";

const InitialLayout = () => {
  const isLoading = useAuthStore((state) => state.isLoading);

  useInitializeAuth();

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default function RootLayout() {
  const isLoading = useAuthStore((state) => state.isLoading);

  useInitializeAuth();

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <InitialLayout />
    </SafeAreaProvider>
  );
}
