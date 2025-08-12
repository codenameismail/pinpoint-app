import React from "react";

import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "All Favorites",
          headerStyle: { backgroundColor: "#f3f4f6" },
          headerTintColor: "#000",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "left",
          contentStyle: {
            backgroundColor: "#f3f4f6",
          },
        }}
      />
      <Stack.Screen
        name="favorite/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="favorite/new" options={{ headerShown: false }} />
    </Stack>
  );
}
