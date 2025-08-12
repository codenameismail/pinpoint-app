import React from "react";

import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-y-2">
      <Text className="text-lg text-purple-700">You Are Him.</Text>
      <Link href="/second" className="text-lg text-blue-500 underline" push>
        Go to Second Screen
      </Link>
      <Link href="/third" className="text-lg text-blue-500 underline" push>
        Go to Third Screen
      </Link>
    </View>
  );
}
