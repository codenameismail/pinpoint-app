import React from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Modal } from "react-native";

import FormField from "../../../components/FormField";
import ImagePicker from "../../../components/newFavoriteScreen/ImagePicker";
import LocationSection from "../../../components/newFavoriteScreen/LocationSection";
import SaveButton from "../../../components/newFavoriteScreen/SaveButton";
import HeaderBar from "../../../components/HeaderBar";
import { ImageSection } from "../../../components/newFavoriteScreen/ImageSection";

import { useAddFavoritePlace } from "../../../hooks/useAddFavoritePlace";

export default function AddFavoritePlaceScreen() {
  // Custom hook to manage the state and logic for adding a favorite place
  const {
    inputTitle,
    setTitleInput,
    pickedImageUri,
    handleImagePicked,
    handleUseCurrentLocation,
    isPickerVisible,
    setPickerVisible,
    handleSave,
  } = useAddFavoritePlace();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar style="dark" />
      {/* Header */}
      <HeaderBar title="Add New Place" />

      <ScrollView
        className="flex-1 bg-white px-4 pt-8"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
      >
        {/* Title Input */}
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
        <ImageSection
          pickedImageUri={pickedImageUri}
          onPickImage={() => setPickerVisible(true)}
        />

        {/* Location */}
        <LocationSection onUseCurrentLocation={handleUseCurrentLocation} />

        {/* Save Button */}
        <SaveButton onPress={handleSave} />
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
