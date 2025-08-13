import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const ImagePicker = ({ onImagePicked, onCancel }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const [recentImages, setRecentImages] = useState([]);
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Request permissions when the component mounts
    const requestPermission = async () => {
      const cameraStatus = await requestCameraPermission();
      if (!cameraStatus.granted) {
        Alert.alert(
          "Permission needed",
          "Camera access is required to take pictures.",
        );
        return;
      }

      const mediaStatus = await requestMediaPermission();
      if (!mediaStatus.granted) {
        Alert.alert(
          "Permission needed",
          "Access to your photos is required to select an image.",
        );
        return;
      }

      // Load recent images from the gallery
      const assets = await MediaLibrary.getAssetsAsync({
        first: 20, // How many images to load
        mediaType: "photo",
        sortBy: "creationTime",
      });
      // Get the actual URIs for the assets
      const assetsWithInfo = await Promise.all(
        assets.assets.map(async (asset) => {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
          return {
            ...asset,
            uri: assetInfo.localUri || assetInfo.uri, // Use localUri if available, fallback to uri
          };
        }),
      );

      setRecentImages(assetsWithInfo);
    };

    requestPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("ImagePicker.jsx - photo taken: ", photo);
        onImagePicked(photo.uri); // Send the URI back to the parent
      } catch (error) {
        console.error("Failed to take picture:", error);
        Alert.alert("Error", "Could not take picture.");
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  // Render a loading or permission-denied state
  if (!cameraPermission || !mediaPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="white" />
      </View>
    );
  }

  // If permissions are denied
  if (!cameraPermission.granted || !mediaPermission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black p-4">
        <Text className="mb-4 text-center text-white">
          Camera and Photo Library access is required.
        </Text>
        <Pressable
          onPress={onCancel}
          className="rounded-full bg-gray-700 px-6 py-3"
        >
          <Text className="font-semibold text-white">Close</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-black"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="relative flex-1">
        {/* Top Controls */}
        <View className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between p-4">
          <Pressable
            onPress={onCancel}
            className="h-12 w-12 items-center justify-center rounded-full bg-black/60 active:scale-[0.98] active:opacity-60"
            hitSlop={10}
          >
            <Ionicons className="" name="close" size={28} color="white" />
          </Pressable>
          {/* You can add a flash toggle here if needed */}
        </View>

        {/* Camera View */}
        <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef} />

        {/* Bottom Controls Wrapper */}
        <View className="absolute bottom-0 left-0 right-0 gap-y-8 bg-black/0">
          {/* Recent Images Gallery */}
          <FlatList
            horizontal
            data={recentImages}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: 10,
            }}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => onImagePicked(item.uri)}>
                  <Image
                    source={{ uri: item.uri }}
                    className="mx-1 h-24 w-24 rounded-lg"
                    style={{
                      height: 96,
                      width: 96,
                    }}
                  />
                </Pressable>
              );
            }}
          />

          {/* Camera Action Buttons */}
          <View className="flex-1 flex-row items-center justify-around">
            {/* Placeholder for gallery button */}
            <View className="h-16 w-16" />

            {/* Shutter Button */}
            <Pressable
              onPress={takePicture}
              className="h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/30"
            >
              <View className="h-16 w-16 rounded-full bg-white" />
            </Pressable>

            {/* Flip Camera Button */}
            <Pressable
              onPress={toggleCameraFacing}
              className="h-16 w-16 items-center justify-center rounded-full bg-black/60 active:scale-[0.98] active:opacity-60"
            >
              <Ionicons name="camera-reverse-outline" size={32} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

ImagePicker.propTypes = {
  onImagePicked: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ImagePicker;
