import React from "react";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable, Modal, Image } from "react-native";

import FormField from "../../../components/FormField";
import ImagePicker from "../../../components/newFavoriteScreen/ImagePicker";

import { useAddFavoritePlace } from "../../../hooks/useAddFavoritePlace";
import Header from "../../../components/newFavoriteScreen/Header";

export default function AddFavoritePlaceScreen() {
  const {
    inputTitle,
    setTitleInput,
    pickedImageUri,
    isPickerVisible,
    setPickerVisible,
    handleBack,
    handleImagePicked,
    handleSave,
  } = useAddFavoritePlace();

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <StatusBar style="dark" />
      {/* Header */}
      <Header onBack={handleBack} title="Add New Place" />

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

          {/* Conditionally render the picked image or the placeholder */}
          {pickedImageUri ? (
            <View className="items-center">
              <Image
                source={{ uri: pickedImageUri }}
                className="mb-4 h-56 w-full rounded-2xl"
              />
              <Pressable
                onPress={() => setPickerVisible(true)}
                className="rounded-full bg-gray-100 px-6 py-3"
              >
                <Text className="font-semibold text-gray-800">
                  Change Image
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => setPickerVisible(true)}
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
                <View className="items-center justify-center rounded-full bg-gray-900 px-6 py-[10px]">
                  <Text className="text-base font-medium text-white">
                    Add Image
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
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
            onPress={handleImagePicked}
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
          onPress={handleSave}
          className="mt-2 h-14 items-center justify-center rounded-full bg-purple-700 active:opacity-90"
          accessibilityRole="button"
          accessibilityLabel="Save place"
        >
          <Text className="text-base font-semibold text-white">Save Place</Text>
        </Pressable>
      </ScrollView>

      {/* --- MODAL FOR THE IMAGE PICKER --- */}
      <Modal visible={isPickerVisible} animationType="slide">
        <ImagePicker
          onImagePicked={handleImagePicked}
          onCancel={() => setPickerVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}
