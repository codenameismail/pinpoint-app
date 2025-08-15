import React, { useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Pressable } from "react-native";

import HeaderBar from "../../components/HeaderBar";

// Custom hook to manage location state
import { useLocationStore } from "../../store/useLocationStore";

const MapScreen = () => {
  const router = useRouter();
  const { latitude, longitude } = useLocalSearchParams();

  // Get the action from your store to set the FINAL location
  const setPickedLocation = useLocationStore(
    (state) => state.setPickedLocation,
  );

  const initialLocation =
    latitude && longitude
      ? {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }
      : null;

  // Use local state for the temporary selection on this screen
  const [currentSelection, setCurrentSelection] = useState(initialLocation);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    // Update the local state, not the global one
    setCurrentSelection(coordinate);
  };

  const handleConfirm = () => {
    if (currentSelection) {
      // Update the global store with the final choice
      console.log(
        "Map.jsx - setting the picked location in store: ",
        currentSelection,
      );
      setPickedLocation(currentSelection);
    }
    // Then, go back
    router.back();
  };
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <HeaderBar title="Select Location" />

      <View className="relative flex-1">
        <MapView
          onPress={handleMapPress}
          style={{ flex: 1 }}
          initialRegion={{
            ...(currentSelection || {
              latitude: 37.78825,
              longitude: -122.4324,
            }),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {currentSelection && (
            <Marker
              pinColor="purple"
              coordinate={currentSelection}
              title="Selected Location"
            />
          )}
        </MapView>
      </View>

      <View className="border-t border-blue-100 bg-blue-50 px-4 py-3">
        <Text className="text-center text-sm text-blue-800">
          Tap anywhere on the map to select a location
        </Text>
      </View>

      <View className="border-t border-gray-100 bg-white px-4 py-4">
        {currentSelection && (
          <Pressable
            onPress={handleConfirm}
            className="h-12 items-center justify-center rounded-full bg-purple-600 active:scale-[0.98] active:opacity-70"
            // disabled={isGettingAddress}
          >
            <Text className="text-lg font-semibold text-white">
              {/* {isGettingAddress ? "Getting Address..." : "Confirm Location"} */}
              Confirm Location
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
