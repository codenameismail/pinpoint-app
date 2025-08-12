import React from "react";

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

import { formatDate } from "../../../utils/helpers";
import { cn } from "../../../utils/cn";
import { favorites } from "../../../data/favorites";

const FavoriteDetailScreen = () => {
  const params = useLocalSearchParams();

  const id = params.id ?? "f1";

  // find the favoritePlace to show
  const favoritePlace = favorites.find((fav) => fav.id === id);

  const handleEdit = () => {
    // Navigate to edit screen or show edit modal
    console.log("Edit favorite:", favoritePlace.id);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Favorite",
      "Are you sure you want to remove this place from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
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
  };

  const handleBack = () => {
    router.back();
  };

  const dateAdded = formatDate(favoritePlace.dateAdded);

  const displayCoordinate = (numOfDecimals) => {
    return `${favoritePlace.location.latitude.toFixed(numOfDecimals)}, ${favoritePlace.location.longitude.toFixed(numOfDecimals)}`;
  };

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
            source={favoritePlace.image}
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
          {/* Title and Action Buttons */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-3xl font-bold leading-tight text-gray-900">
                  {favoritePlace.title}
                </Text>
              </View>

              {/* Action Buttons */}
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

          {/* Map Container */}
          <View className="mb-6">
            <View className="h-48 w-full overflow-hidden rounded-2xl bg-blue-100">
              {/* Placeholder for map - replace with actual map component */}
              <View className="flex-1 items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300">
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

          {/* Additional Info */}
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
