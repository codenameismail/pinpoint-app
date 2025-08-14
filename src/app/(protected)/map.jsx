import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";

import HeaderBar from "../../components/HeaderBar";

const MapScreen = () => {
  const { latitude, longitude } = useLocalSearchParams();
  const displayLocation = {
    latitude: latitude ? parseFloat(latitude) : 37.78825,
    longitude: longitude ? parseFloat(longitude) : -122.4324,
  };
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(
    displayLocation || null,
  );

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleConfirm = () => {
    // Navigate back with the selected location
    router.navigate({
      pathname: "/favorite/new",
      params: {
        latitude: selectedLocation.latitude.toString(),
        longitude: selectedLocation.longitude.toString(),
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 border bg-white" edges={["top", "bottom"]}>
      {/* Status Bar */}
      <StatusBar style="dark" />

      {/* Header */}
      <HeaderBar title="Select Location" />

      {/* Map Container */}
      <View className="relative flex-1">
        {/* This is where your actual map component will go */}
        <View className="flex-1 items-center justify-center bg-gray-100">
          <MapView
            onPress={handleMapPress}
            style={{ flex: 1, width: "100%" }}
            initialRegion={{
              // have a default region
              ...displayLocation,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {(selectedLocation || displayLocation) && (
              <Marker
                //   style the marker
                pinColor="purple"
                coordinate={selectedLocation || displayLocation}
                title="Selected Location"
                description="Tap 'Confirm' below to use this spot"
              />
            )}
          </MapView>
        </View>
      </View>

      {/* Instructions */}
      <View className="border-t border-blue-100 bg-blue-50 px-4 py-3">
        <Text className="text-center text-sm text-blue-800">
          Tap anywhere on the map to select a location
        </Text>
      </View>

      {/* Bottom Action Bar */}
      <View className="border-t border-gray-100 bg-white px-4 py-4">
        {(selectedLocation || displayLocation) && (
          <Pressable
            onPress={handleConfirm}
            className="h-12 items-center justify-center rounded-full bg-purple-600 active:scale-[0.98] active:opacity-70"
            hitSlop={10}
          >
            <Text className="text-lg font-semibold text-white">
              Confirm Location
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
