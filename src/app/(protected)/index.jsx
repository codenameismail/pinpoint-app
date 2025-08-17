import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import FavoriteList from "../../components/allFavoritesScreen/FavoriteList";
import FabButton from "../../components/allFavoritesScreen/FabButton";

import { useFavoritesStore } from "../../store/favoritesStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function AllFavoritesScreen() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const logOut = useAuthStore((state) => state.logOut);

  useEffect(() => {
    setTimeout(() => {
      logOut();
    }, 5000);
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4" edges={["top", "right", "left"]}>
      {/* Favorites Grid */}
      <FavoriteList favorites={favorites} />

      {/* Floating Add Button */}
      <FabButton />
    </SafeAreaView>
  );
}
