import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";

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

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header with Back Button */}
      <View className="absolute left-4 top-12 z-10">
        <Pressable
          onPress={handleBack}
          className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg active:scale-95"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={favoritePlace.image}
            className="h-80 w-full"
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
        </View>

        {/* Content Container */}
        <View className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 pt-8">
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
                  {favoritePlace.location.latitude.toFixed(6)},{" "}
                  {favoritePlace.location.longitude.toFixed(6)}
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
          <View className="mb-8">
            <Text className="mb-3 text-lg font-semibold text-gray-900">
              Details
            </Text>

            <View className="space-y-3">
              <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
                <Text className="text-gray-600">Added on</Text>
                <Text className="font-medium text-gray-900">
                  {favoritePlace.dateAdded.toLocaleDateString()}
                </Text>
              </View>

              <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
                <Text className="text-gray-600">Coordinates</Text>
                <Text className="font-medium text-gray-900">
                  {favoritePlace.location.latitude.toFixed(4)},{" "}
                  {favoritePlace.location.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons at Bottom */}
          <View className="space-y-3 pb-8">
            <Pressable className="active:scale-98 w-full rounded-2xl bg-black py-4 active:opacity-90">
              <Text className="text-center text-lg font-semibold text-white">
                Get Directions
              </Text>
            </Pressable>

            <Pressable className="active:scale-98 w-full rounded-2xl bg-gray-100 py-4 active:bg-gray-200">
              <Text className="text-center text-lg font-semibold text-gray-900">
                Share Location
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

FavoriteDetailScreen.propTypes = {
  favorite: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired,
    dateAdded: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FavoriteDetailScreen;
