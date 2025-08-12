import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddFavoritePlaceScreen() {
  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const noop = useCallback(() => {
    // TODO: wire up image picker, location, and save
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <StatusBar style="dark" />
      {/* Header */}
      <View className="relative h-[60px] items-center justify-center border-b border-gray-200 px-4">
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform flex-row items-center gap-x-1 active:scale-[0.98] active:opacity-80"
        >
          <Ionicons name="chevron-back" size={28} color="#111827" />
          <Text className="text-lg font-medium text-gray-900">Back</Text>
        </Pressable>

        <Text className="text-center text-2xl font-semibold text-gray-900">
          Add New Place
        </Text>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View className="mb-6">
          <Text className="mb-2 text-base font-medium text-gray-900">
            Title
          </Text>
          <TextInput
            placeholder="e.g. My Favorite Coffee Shop"
            placeholderTextColor="#9CA3AF"
            className="h-14 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-gray-900"
            returnKeyType="done"
          />
        </View>

        {/* Image */}
        <View className="mb-8">
          <Text className="mb-2 text-base font-medium text-gray-900">
            Image
          </Text>

          <View className="rounded-2xl border-2 border-dashed border-gray-300 p-4">
            <View className="items-center justify-center py-8">
              <View className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-purple-50">
                <Ionicons name="image" size={28} color="#7e22ce" />
              </View>
              <Text className="mb-1 text-lg font-semibold text-gray-900">
                Upload or Capture
              </Text>
              <Text className="mb-5 text-center text-sm text-gray-500">
                PNG, JPG up to 10MB
              </Text>

              <Pressable
                onPress={noop}
                className="h-12 items-center justify-center rounded-full bg-gray-900 px-6 active:opacity-90"
                accessibilityRole="button"
                accessibilityLabel="Choose or capture an image"
              >
                <Text className="text-base font-medium text-white">
                  Add Image
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Location */}
        <View className="mb-6">
          <Text className="mb-2 text-base font-medium text-gray-900">
            Location
          </Text>

          {/* Map placeholder */}
          <View className="h-48 w-full overflow-hidden rounded-2xl bg-purple-50">
            <View className="flex-1 items-center justify-center">
              <Ionicons name="map" size={46} color="#7e22ce" />
              <Text className="mt-2 text-sm text-purple-700">Map Preview</Text>
            </View>
          </View>

          <Pressable
            onPress={noop}
            className="mt-4 h-12 flex-row items-center justify-center rounded-full bg-gray-100 active:opacity-90"
            accessibilityRole="button"
            accessibilityLabel="Use current location"
          >
            <Ionicons name="locate" size={18} color="#111827" />
            <Text className="ml-2 font-medium text-gray-900">
              Use Current Location
            </Text>
          </Pressable>
        </View>

        {/* Save */}
        <Pressable
          onPress={noop}
          className="mt-2 h-14 items-center justify-center rounded-full bg-purple-700 active:opacity-90"
          accessibilityRole="button"
          accessibilityLabel="Save place"
        >
          <Text className="text-base font-semibold text-white">Save Place</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
