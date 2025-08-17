import React from "react";

import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const FavoritesScreenHeader = () => {
  const router = useRouter();
  const handleProfilePress = () => {
    router.push("/(protected)/profile");
  };
  return (
    <View
      className="flex-row items-center justify-between pb-4 pt-8"
      style={{
        paddingHorizontal: 8,
      }}
    >
      <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
      {/* profile icon */}
      <Ionicons
        name="person-circle-outline"
        size={32}
        color="#3b82f6"
        onPress={handleProfilePress}
        style={{ marginRight: 8 }}
      />
    </View>
  );
};

export default FavoritesScreenHeader;
