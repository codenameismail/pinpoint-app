import { useCallback, useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useAddFavoritePlace = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [inputTitle, setTitleInput] = useState("");
  const [pickedImageUri, setPickedImageUri] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const handleBack = () => {
    router.back();
  };

  const handleImagePicked = (uri) => {
    setPickedImageUri(uri);
    setPickerVisible(false);
  };

  const handleUseCurrentLocation = useCallback((locationData) => {
    if (locationData) {
      setLocation({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      });
    }
  }, []);

  // function to validate all inputs before saving
  const validateInputs = () => {
    if (!inputTitle.trim()) {
      Alert.alert("Invalid Input", "Please enter a title for the place.");
      return false;
    }
    if (!pickedImageUri) {
      Alert.alert("No Image Selected", "Please select an image for the place.");
      return false;
    }
    if (!location.latitude || !location.longitude) {
      Alert.alert(
        "Location Required",
        "Please select a location for the place.",
      );
      return false;
    }
    return true;
  };

  const handleSave = useCallback(() => {
    // validate
    if (!validateInputs()) {
      return;
    }
    // Create a new favorite place object
    const newPlace = {
      id: new Date().toString() + Math.random().toString(), // A simple unique ID
      title: inputTitle,
      imageUri: pickedImageUri,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      dateAdded: new Date(),
    };

    console.log("New Favorite Place:", newPlace);
  }, [inputTitle, pickedImageUri, location]);

  return {
    inputTitle,
    setTitleInput,
    pickedImageUri,
    handleImagePicked,
    location,
    handleUseCurrentLocation,
    isPickerVisible,
    setPickerVisible,
    handleBack,
    handleSave,
  };
};
