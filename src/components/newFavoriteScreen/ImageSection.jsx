import React from "react";
import PropTypes from "prop-types";

import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputHeader from "./InputHeader";

const ImagePlaceholder = ({ onPress }) => (
  <Pressable
    onPress={onPress}
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
        <Text className="text-base font-medium text-white">Add Image</Text>
      </View>
    </View>
  </Pressable>
);

const SelectedImage = ({ uri, onChangeImage }) => (
  <View className="items-center">
    <Image
      source={{ uri }}
      className="mb-4 h-64 w-full rounded-2xl"
    />
    <Pressable
      onPress={onChangeImage}
      className="rounded-full bg-gray-100 px-6 py-3"
    >
      <Text className="font-semibold text-gray-800">Change Image</Text>
    </Pressable>
  </View>
);

export const ImageSection = ({ pickedImageUri, onPickImage }) => (
  <View className="mb-8 gap-y-2">
    {/* Title */}
    <InputHeader title={"Image"} />
    {pickedImageUri ? (
      <SelectedImage uri={pickedImageUri} onChangeImage={onPickImage} />
    ) : (
      <ImagePlaceholder onPress={onPickImage} />
    )}
  </View>
);

ImageSection.propTypes = {
  pickedImageUri: PropTypes.string,
  onPickImage: PropTypes.func.isRequired,
};
ImagePlaceholder.propTypes = {
  onPress: PropTypes.func.isRequired,
};
SelectedImage.propTypes = {
  uri: PropTypes.string.isRequired,
  onChangeImage: PropTypes.func.isRequired,
};
