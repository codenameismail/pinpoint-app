import React, { useRef } from "react";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { usePreventRemove } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import FormField from "../../../components/FormField";
import ImagePicker from "../../../components/newFavoriteScreen/ImagePicker";
import LocationPicker from "../../../components/newFavoriteScreen/LocationPicker";
import SaveButton from "../../../components/newFavoriteScreen/SaveButton";
import HeaderBar from "../../../components/HeaderBar";
import { ImageSection } from "../../../components/newFavoriteScreen/ImageSection";

import { useAddFavoritePlace } from "../../../hooks/useAddFavoritePlace";
import { useDraftFavoriteStore } from "../../../store/draftFavoriteStore";

export default function AddFavoritePlaceScreen() {
  const navigation = useNavigation();

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

  // Get store functions
  const { clearDraftFavorite, hasDraftContent } = useDraftFavoriteStore();

  usePreventRemove(
    hasDraftContent(), // 1. The condition to prevent removal (true if there's a draft)
    ({ data }) => {
      // 2. The callback to run when removal is prevented
      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure you want to discard them and leave?",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              clearDraftFavorite();
              // Use the navigation to perform the original action
              navigation.dispatch(data.action);
            },
          },
        ],
      );
    },
  );

  const scrollViewRef = useRef(null);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <HeaderBar title="Add New Place" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 bg-white px-4"
          contentContainerStyle={{
            paddingTop: 32,
            paddingBottom: 36,
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

          {/* Description - Add automatic scrolling when focused */}
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
                onFocus: () => {
                  // Add a slight delay to ensure keyboard is visible first
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 350);
                },
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
      </KeyboardAvoidingView>

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
