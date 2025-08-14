import React from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Modal } from "react-native";

import FormField from "../../../components/FormField";
import ImagePicker from "../../../components/newFavoriteScreen/ImagePicker";
import LocationPicker from "../../../components/newFavoriteScreen/LocationPicker";
import SaveButton from "../../../components/newFavoriteScreen/SaveButton";
import HeaderBar from "../../../components/HeaderBar";
import { ImageSection } from "../../../components/newFavoriteScreen/ImageSection";

import { useAddFavoritePlace } from "../../../hooks/useAddFavoritePlace";

export default function AddFavoritePlaceScreen() {
  // Custom hook to manage the state and logic for adding a favorite place
  const {
    // Form state
    title,
    setTitle,
    imageUri,
    location,
    description,
    setDescription,

    // UI state
    isSubmitting,
    isPickerVisible,
    setPickerVisible,

    // Handlers
    handleImageSelected,
    handleLocationSelected,
    handleResetLocation,
    handleSubmit,
  } = useAddFavoritePlace();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar style="dark" />
      <HeaderBar title="Add New Place" />

      <ScrollView
        className="flex-1 bg-white px-4 pt-8"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Title Input */}
        <View className="mb-6">
          <FormField
            label={"Title"}
            value={title}
            onChangeText={setTitle}
            placeholder={"e.g. My Favorite Coffee Shop"}
            inputProps={{
              returnKeyType: "done",
            }}
          />
        </View>

        {/* Image */}
        <ImageSection
          pickedImageUri={imageUri}
          onPickImage={() => setPickerVisible(true)}
        />

        {/* Location */}
        <LocationPicker
          selectedLocation={location}
          onLocationSelected={handleLocationSelected}
          onResetLocation={handleResetLocation}
        />

        {/* <LocationSection onUseCurrentLocation={handleLocationSelected} /> */}

        {/* Description */}
        <View className="mb-8 pt-9">
          <FormField
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Tell us about this place..."
            inputProps={{
              multiline: true,
              numberOfLines: 4,
              textAlignVertical: "top",
              style: { height: 100, paddingTop: 12 },
            }}
          />
        </View>

        {/* Save Button */}
        <SaveButton
          onPress={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </ScrollView>

      {/* --- MODAL FOR THE IMAGE PICKER --- */}
      <Modal visible={isPickerVisible} animationType="slide">
        <ImagePicker
          onImagePicked={handleImageSelected}
          onCancel={() => setPickerVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}
