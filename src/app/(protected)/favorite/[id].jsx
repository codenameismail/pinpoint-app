import React from "react";
import PropTypes from "prop-types";

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

const FavoriteDetailScreen = () => {
  const { id } = useLocalSearchParams();

  // const { getFavoriteFromDbById, removeFavoriteFromDB } = useFavoritesStoreDB(
  //   (state) => ({
  //     getFavoriteFromDbById: state.getFavoriteFromDbById,
  //     removeFavoriteFromDB: state.removeFavoriteFromDB,
  //   }),
  // );
  const getFavoriteFromDbById = useFavoritesStoreDB(
    (state) => state.getFavoriteFromDbById,
  );
  const removeFavoriteFromDB = useFavoritesStoreDB(
    (state) => state.removeFavoriteFromDB,
  );

  const favoritePlace = getFavoriteFromDbById(id);

  const handleBack = () => router.back();

  const handleEdit = () => {
    if (!favoritePlace) return;
    console.log("Edit favorite:", favoritePlace.id);
  };

  const handleDelete = () => {
    if (!favoritePlace) return;

    Alert.alert(
      "Delete Favorite",
      "Are you sure you want to remove this place from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeFavoriteFromDB(favoritePlace.id);
              router.back();
            } catch (error) {
              Alert.alert(
                "Error",
                `Failed to delete favorite: ${error.message || error}`,
              );
            }
          },
        },
      ],
    );
  };

  const formatCoordinates = (decimals) =>
    `${favoritePlace.location.latitude.toFixed(decimals)}, ${favoritePlace.location.longitude.toFixed(decimals)}`;

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

  const imgSource = favoritePlace.imageUri
    ? favoritePlace.imageUri
    : { uri: favoritePlace.image_uri };

  return (
    <>
      <StatusBar style="light" />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
      >
        {/* Back Button */}
        <View className="absolute left-4 top-16 z-10">
          <Pressable
            onPress={handleBack}
            className="h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-lg active:scale-95"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
        </View>

        {/* Hero Image */}
        <ImageBackground
          // source={{ uri: favoritePlace.image_uri }}
          source={imgSource}
          className="h-96 w-full"
          resizeMode="cover"
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={{ flex: 1 }}
          />
        </ImageBackground>

        {/* Content */}
        <View className="-mt-8 flex-1 rounded-t-[30px] bg-white px-6 pt-8">
          {/* Header */}
          <View className="mb-6 flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-bold leading-tight text-gray-900">
                {favoritePlace.title}
              </Text>
              <View className="mt-2 flex-row items-center">
                <Ionicons name="location-outline" size={18} color="#6B7280" />
                <Text className="ml-2 text-base text-gray-600">
                  {favoritePlace.location.address}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <Pressable
                onPress={handleEdit}
                className="h-12 w-12 items-center justify-center rounded-full bg-blue-50 active:scale-95"
              >
                <Ionicons name="pencil" size={20} color="#3B82F6" />
              </Pressable>
              <Pressable
                onPress={handleDelete}
                className="h-12 w-12 items-center justify-center rounded-full bg-red-50 active:scale-95"
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </Pressable>
            </View>
          </View>

          {/* Map Placeholder */}
          <View className="mb-6 h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-blue-100">
            <Ionicons name="map" size={48} color="#3B82F6" />
            <Text className="mt-2 font-medium text-blue-700">Map View</Text>
            <Text className="text-sm text-blue-600">
              {formatCoordinates(6)}
            </Text>
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
              <DetailRow
                label="Added on"
                value={formatDate(favoritePlace.created_at)}
              />
              <DetailRow label="Coordinates" value={formatCoordinates(4)} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const DetailRow = ({ label, value }) => (
  <View className="flex-row items-center justify-between border-b border-gray-100 py-3">
    <Text className="text-gray-600">{label}</Text>
    <Text className="font-medium text-gray-900">{value}</Text>
  </View>
);

DetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FavoriteDetailScreen;
