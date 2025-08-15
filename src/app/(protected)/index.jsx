import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FavoriteList from "../../components/allFavoritesScreen/FavoriteList";
import FabButton from "../../components/allFavoritesScreen/FabButton";

import { useFavoritesStore } from "../../store/useFavoritesStore";

export default function AllFavoritesScreen() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <SafeAreaView className="flex-1 px-4" edges={["top", "right", "left"]}>
      {/* Favorites Grid */}
      <FavoriteList favorites={favorites} />

      {/* Floating Add Button */}
      <FabButton />
    </SafeAreaView>
  );
}
