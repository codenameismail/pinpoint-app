import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ActivityIndicator } from "react-native";

import { useFavoritesStoreDB } from "../../store/favoritesStoreDB";

import FavoriteList from "../../components/allFavoritesScreen/FavoriteList";
import FabButton from "../../components/allFavoritesScreen/FabButton";

export default function AllFavoritesScreen() {
  const favorites = useFavoritesStoreDB((state) => state.favorites);
  const fetchFavoritesFromDB = useFavoritesStoreDB(
    (state) => state.fetchFavoritesFromDB,
  );
  const isLoading = useFavoritesStoreDB((state) => state.isLoading);

  useEffect(() => {
    fetchFavoritesFromDB();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 italic text-slate-500">Loading favorites...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-4" edges={["top", "right", "left"]}>
      {/* Favorites Grid */}
      <FavoriteList favorites={favorites} />

      {/* Floating Add Button */}
      <FabButton />
    </SafeAreaView>
  );
}
