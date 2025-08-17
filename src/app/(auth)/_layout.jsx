import React from "react";

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ animation: "none" }} />
      <Stack.Screen name="sign-up" options={{ animation: "none" }} />
    </Stack>
  );
}
