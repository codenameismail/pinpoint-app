import React, { useCallback, useMemo } from "react";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { useFavoritesStoreDB } from "../../../store/favoritesStoreDB";

import { formatDate } from "../../../utils/helpers";
import { cn } from "../../../utils/cn";

const FavoriteDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const getFavoriteFromDbById = useFavoritesStoreDB(
    (state) => state.getFavoriteFromDbById,
  );

  // Lookup and memoize the current favorite
  const favoritePlace = getFavoriteFromDbById(id);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleEdit = useCallback(() => {
    if (!favoritePlace) return;
    // Navigate to edit screen or show edit modal
    console.log("Edit favorite:", favoritePlace.id);
  }, [favoritePlace]);

  const handleDelete = useCallback(() => {
    if (!favoritePlace) return;
    Alert.alert(
      "Delete Favorite",
      "Are you sure you want to remove this place from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Handle delete logic here
            console.log("Delete favorite:", favoritePlace.id);
            router.back();
          },
        },
      ],
    );
  }, [favoritePlace]);

  const dateAdded = useMemo(
    () => (favoritePlace ? formatDate(favoritePlace.created_at) : ""),
    [favoritePlace],
  );

  const displayCoordinate = useCallback(
    (numOfDecimals) =>
      favoritePlace
        ? `${favoritePlace.location.latitude.toFixed(numOfDecimals)}, ${favoritePlace.location.longitude.toFixed(numOfDecimals)}`
        : "",
    [favoritePlace],
  );

  const isImageUriNumber = typeof favoritePlace.imageUri === "number";
  // Determine the image source based on what's available
  const imageSource = isImageUriNumber
    ? favoritePlace.imageUri
    : { uri: favoritePlace.imageUri };

  // Fallback UI if param is missing or not found
  if (!id || !favoritePlace) {
    return (
      <>
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center bg-white px-6">
          <Text className="mb-4 text-base text-gray-600">
            Favorite not found.
          </Text>
          <Pressable
            onPress={handleBack}
            className="h-12 items-center justify-center rounded-full bg-gray-200 px-5 active:scale-95"
          >
            <Text className="font-medium text-gray-900">Go back</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        {/* Header with Back Button */}
        <View className="absolute left-4 top-16 z-10">
          <Pressable
            onPress={handleBack}
            className="h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-lg active:scale-95"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
        </View>

        {/* Hero Image */}
        <View className="relative">
          <ImageBackground
            source={imageSource}
            className="h-96 w-full"
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={{ flex: 1 }}
            />
          </ImageBackground>
        </View>

        {/* Content Container */}
        <View className="-mt-8 flex-1 rounded-t-[30px] bg-white px-6 pt-8">
          {/* Title and Actions */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-3xl font-bold leading-tight text-gray-900">
                  {favoritePlace.title}
                </Text>
              </View>

              <View className="flex-row gap-3">
                <Pressable
                  onPress={handleEdit}
                  className={cn(
                    "h-12 w-12 items-center justify-center rounded-full",
                    "bg-blue-50 active:scale-95 active:bg-blue-100",
                  )}
                >
                  <Ionicons name="pencil" size={20} color="#3B82F6" />
                </Pressable>

                <Pressable
                  onPress={handleDelete}
                  className={cn(
                    "h-12 w-12 items-center justify-center rounded-full",
                    "bg-red-50 active:scale-95 active:bg-red-100",
                  )}
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </Pressable>
              </View>
            </View>

            {/* Location */}
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={18} color="#6B7280" />
              <Text className="ml-2 flex-1 text-base text-gray-600">
                {favoritePlace.location.address}
              </Text>
            </View>
          </View>

          {/* Map Container (placeholder) */}
          <View className="mb-6">
            <View className="h-48 w-full overflow-hidden rounded-2xl bg-blue-100">
              <View className="flex-1 items-center justify-center">
                <Ionicons name="map" size={48} color="#3B82F6" />
                <Text className="mt-2 font-medium text-blue-700">Map View</Text>
                <Text className="px-4 text-center text-sm text-blue-600">
                  {displayCoordinate(6)}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="mb-3 text-lg font-semibold text-gray-900">
              About this place
            </Text>
            <Text className="text-base leading-relaxed text-gray-700">
              {favoritePlace.description}
            </Text>
          </View>

          {/* Details */}
          <View className="pb-16">
            <Text className="mb-3 text-lg font-semibold text-gray-900">
              Details
            </Text>

            <View className="gap-y-3">
              <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
                <Text className="text-gray-600">Added on</Text>
                <Text className="font-medium text-gray-900">{dateAdded}</Text>
              </View>

              <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
                <Text className="text-gray-600">Coordinates</Text>
                <Text className="font-medium text-gray-900">
                  {displayCoordinate(4)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default FavoriteDetailScreen;
