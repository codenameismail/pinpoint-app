import { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";

import { useDraftFavoriteStore } from "../store/draftFavoriteStore";
import { useLocationStore } from "../store/locationStore";
import { useFavoritesStoreDB } from "../store/favoritesStoreDB";

import { uploadImage } from "../utils/supabaseImageStorage";

export const useAddFavoritePlace = () => {
  /*
   * Get latitude and longitude from the useLocationStore
   * This is when the user selects a location from a map and gets sent back to the new favorite screen
   */
  const pickedLocation = useLocationStore((state) => state.pickedLocation);
  const clearPickedLocation = useLocationStore(
    (state) => state.clearPickedLocation,
  );

  useEffect(() => {
    if (pickedLocation) {
      // Update the local state with the new location from store
      setLocation(pickedLocation);

      // Optional: Clear the store after using the value
      clearPickedLocation();
    }
  }, [pickedLocation]);

  // Get draft data and update functions from store
  const draftFavorite = useDraftFavoriteStore((state) => state.draftFavorite);
  const updateDraftFavorite = useDraftFavoriteStore(
    (state) => state.updateDraftFavorite,
  );
  const clearDraftFavorite = useDraftFavoriteStore(
    (state) => state.clearDraftFavorite,
  );

  // Get the add function from store
  const addFavoriteToDB = useFavoritesStoreDB((state) => state.addFavoriteToDB);

  // Form state
  const [title, setTitle] = useState(draftFavorite.title || "Some Place");
  const [imageUri, setImageUri] = useState(draftFavorite.imageUri || null);
  const [location, setLocation] = useState(pickedLocation || null);
  const [description, setDescription] = useState(
    draftFavorite.description || "No description provided",
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  // Keep draft in sync with local state
  useEffect(() => {
    updateDraftFavorite({
      title,
      imageUri,
      description,
    });
  }, [title, imageUri, description]);

  // Validation
  const validateInputs = () => {
    if (!title.trim()) {
      Alert.alert("Invalid Input", "Please enter a title for the place.");
      return false;
    }

    if (!imageUri) {
      Alert.alert("No Image Selected", "Please select an image for the place.");
      return false;
    }

    if (!location) {
      Alert.alert(
        "Location Required",
        "Please select a location for the place.",
      );
      return false;
    }

    return true;
  };

  // Handle image selection
  const handleImageSelected = useCallback((uri) => {
    setImageUri(uri);
    setPickerVisible(false);
  }, []);

  // Handle location selection
  const handleLocationSelected = (coords) => {
    if (!coords) return;

    // TODO: get the address from the coordinates

    // Set the location state with the coords
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
      address: "UNKNOWN", // Temp value
    });
  };

  // Handle resetting the location
  const handleResetLocation = () => {
    setLocation(null);
    Alert.alert("Location Reset", "The selected location has been cleared.");
  };

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!validateInputs()) return; // all the user feedback will come from this call

    setIsSubmitting(true);

    try {
      // Upload image first and get the public URL
      console.log("Uploading image to supabase...");
      const imageUrl = await uploadImage(imageUri);
      console.log("Image uploaded successfully!");

      // Create the data object matching the store's expectation
      const newFavoriteData = {
        title,
        image_uri: imageUrl, // uusing the Supabase URL instead of local URI
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: "Some Unknown Address", // You'll fix this later
        },
        description: description || "No description provided",
      };

      // Save to database
      await addFavoriteToDB(newFavoriteData);

      // clear the draft state
      clearDraftFavorite();
      // Navigate back
      router.replace("/(protected)/");
    } catch (error) {
      console.error("Error saving favorite:", error);
      Alert.alert("Error", `Failed to save favorite: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [title, imageUri, location, description, addFavoriteToDB]);

  return {
    // Form state
    title,
    setTitle,
    imageUri,
    setImageUri,
    location,
    setLocation,
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
  };
};
