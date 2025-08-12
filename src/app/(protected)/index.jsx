import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FavoriteList from "../../components/allFavoritesScreen/FavoriteList";
import FabButton from "../../components/allFavoritesScreen/FabButton";

import { favorites } from "../../data/favorites";

export default function AllFavoritesScreen() {
  return (
    <SafeAreaView className="flex-1 px-4" edges={["top", "right", "left"]}>
      {/* Favorites Grid */}
      <FavoriteList favorites={favorites} />

      {/* Floating Add Button */}
      <FabButton />
    </SafeAreaView>
  );
}
