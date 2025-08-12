import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import FavoriteList from "../../components/allFavoritesScreen/FavoriteList";

import { favorites } from "../../../data/favorites";

export default function AllFavoritesScreen() {
  return (
    <SafeAreaView className="flex-1" edges={["top", "right", "left"]}>
      {/* Favorites Grid */}
      <FavoriteList favorites={favorites} />

      {/* Floating Add Button */}
      <View className="absolute bottom-8 right-6">
        <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full bg-purple-600 shadow-lg">
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
