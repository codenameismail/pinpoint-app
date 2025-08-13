import { useState } from "react";
import { router } from "expo-router";

export const useAddFavoritePlace = () => {
  const [inputTitle, setTitleInput] = useState("");
  const [pickedImageUri, setPickedImageUri] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleImagePicked = (uri) => {
    setPickedImageUri(uri);
    setPickerVisible(false);
  };

  const handleSave = () => {
    // TODO: wire up save logic with the title and pickedImageUri
    console.log("Title:", inputTitle);
    console.log("Image URI:", pickedImageUri);
  };

  return {
    inputTitle,
    setTitleInput,
    pickedImageUri,
    isPickerVisible,
    setPickerVisible,
    handleBack,
    handleImagePicked,
    handleSave,
  };
};
