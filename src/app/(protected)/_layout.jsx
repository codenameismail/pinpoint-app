import React from "react";

import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: "All Favorites",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          headerShown: false,
          contentStyle: {
            backgroundColor: "#f3f4f6",
          },
        }}
      />
    </Stack>
  );
}
