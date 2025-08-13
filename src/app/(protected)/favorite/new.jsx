import React from "react";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable, Modal } from "react-native";

import FormField from "../../../components/FormField";
import ImagePicker from "../../../components/newFavoriteScreen/ImagePicker";
import Header from "../../../components/newFavoriteScreen/Header";
import { ImageSection } from "../../../components/newFavoriteScreen/ImageSection";

import { useAddFavoritePlace } from "../../../hooks/useAddFavoritePlace";

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

          <ImageSection
            pickedImageUri={pickedImageUri}
            onPickImage={() => setPickerVisible(true)}
          />
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
