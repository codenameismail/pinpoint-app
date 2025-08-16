import React from "react";

import { Stack, Redirect } from "expo-router";

import { useAuthStore } from "../../store/useAuthStore";

export default function ProtectedLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "All Favorites",
        }}
      />
      <Stack.Screen
        name="favorite/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="favorite/new" options={{ headerShown: false }} />
      <Stack.Screen
        name="map"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
