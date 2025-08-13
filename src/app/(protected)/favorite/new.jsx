import React, { useCallback, useState } from "react";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable } from "react-native";

import FormField from "../../../components/FormField";

export default function AddFavoritePlaceScreen() {
  const [inputTitle, setTitleInput] = useState("");

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
        className="flex-1 bg-white px-4 pt-8"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View className="mb-6">
          <FormField
            label={"Title"}
            onChangeText={setTitleInput}
            value={inputTitle}
            placeholder={"e.g. My Favorite Coffee Shop"}
            inputProps={{
              returnKeyType: "done",
            }}
          />
        </View>

        {/* Image */}
        <View className="mb-8">
          <Text className="mb-2 text-base font-medium text-gray-900">
            Image
          </Text>

          <Pressable
            onPress={noop}
            className="rounded-2xl border-2 border-dashed border-gray-300 p-4 active:scale-[0.99] active:border-purple-300"
          >
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
                className="items-center justify-center rounded-full bg-gray-900 px-6 py-[10px] active:scale-[0.98] active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel="Choose or capture an image"
              >
                <Text className="text-base font-medium text-white">
                  Add Image
                </Text>
              </Pressable>
            </View>
          </Pressable>
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
