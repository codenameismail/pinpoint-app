import React, { useState } from "react";

import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Pressable } from "react-native";

import HeaderBar from "../../components/HeaderBar";

const MapScreen = () => {
  const { latitude, longitude } = useLocalSearchParams();
  const initialLocation =
    latitude && longitude
      ? {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }
      : null;

  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  // TODO: Implement after getting function to fetch address from coords
  // const [isGettingAddress, setIsGettingAddress] = useState(false);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleConfirm = () => {
    // TODO: get address for the selected location than navigate back with coords and address

    // Navigate back with just the coordinates
    router.navigate({
      pathname: "/(protected)/favorite/new",
      params: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
    });
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
            ...(selectedLocation || {
              latitude: 37.78825,
              longitude: -122.4324,
            }),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {selectedLocation && (
            <Marker
              pinColor="purple"
              coordinate={selectedLocation}
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
        {selectedLocation && (
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
