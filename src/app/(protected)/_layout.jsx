import React from "react";

import { ActivityIndicator } from "react-native";
import { Stack, Redirect } from "expo-router";

import { useAuthStore } from "../../store/authStore";

export default function ProtectedLayout() {
  const session = useAuthStore((state) => state.session);
  const isLoading = useAuthStore((state) => state.isLoading);

  // The isLoading check is now more robust.
  // We wait until the session is explicitly loaded.
  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (!session) {
    return <Redirect href={"/(auth)/sign-up"} />;
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
