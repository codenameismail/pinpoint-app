import { useCallback, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";

import { useFavoritesStore } from "../store/useFavoritesStore";
import { useDraftFavoriteStore } from "../store/useDraftFavoriteStore";

export const useAddFavoritePlace = () => {
  /*
   * Get latitude and longitude from URL params
   * This is when the user selects a location from a map and gets redirected to the new favorite screen
   * e.g. /(protected)/favorite/new?latitude=12.34&longitude=56.78
   */
  const { latitude, longitude } = useLocalSearchParams();
  const locationFromParams =
    latitude && longitude
      ? {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }
      : null;

  // Get draft data and update functions from store
  const draftFavorite = useDraftFavoriteStore((state) => state.draftFavorite);
  const updateDraftFavorite = useDraftFavoriteStore(
    (state) => state.updateDraftFavorite,
  );
  // Get the add function from store
  const addFavorite = useFavoritesStore((state) => state.addFavorite);

  // Form state
  const [title, setTitle] = useState(draftFavorite.title || "");
  const [imageUri, setImageUri] = useState(draftFavorite.imageUri || null);
  const [location, setLocation] = useState(locationFromParams || null);
  const [description, setDescription] = useState(
    draftFavorite.description || "",
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
    console.log("updated drafts");
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
  const handleSubmit = useCallback(() => {
    if (!validateInputs()) return; // all the user feedback will come from this call

    setIsSubmitting(true);

    try {
      // Create a new favorite
      const newFavorite = {
        id: crypto.randomUUID(),
        title,
        imageUri,
        location, // an object with {latitude, longitude}
        description: description || "No description provided",
        dateAdded: new Date(),
      };

      // add to store
      addFavorite(newFavorite);

      // Navigate back
      router.replace("/(protected)/");
    } catch (error) {
      Alert.alert("Error", "Failed to save place. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [title, imageUri, location, description, addFavorite]);

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
