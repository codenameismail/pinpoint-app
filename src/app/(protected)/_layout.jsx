import React from "react";

import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
    </Stack>
  );
}
