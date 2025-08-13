import React, { useState, useEffect } from "react";

import { View, Text, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useForegroundPermissions,
  getCurrentPositionAsync,
  LocationAccuracy,
} from "expo-location";

import { cn } from "../../utils/cn";

/* 
{"coords": {"accuracy": 35, "altitude": 1349.5909118652344, "altitudeAccuracy": 9.722363471984863, "heading": -1, "latitude": -26.689489541648225, "longitude": 27.09211097965955, "speed": -1}, "timestamp": 1755098756787.551}
*/

const LocationSection = () => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Request permissions when the component mounts
    const requestLocationPermission = async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Location access is required to use this feature.",
        );
      }
    };
    requestLocationPermission();
  }, []);

  const handleUseCurrentLocation = async () => {
    // Clear any previous errors
    setLocationError(null);
    setIsLoadingLocation(true);

    try {
      const location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.High,
        mayShowUserSettingsDialog: true,
        timeInterval: 3000,
      });

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Optional: Show success feedback
      console.log("Location obtained:", location.coords);
    } catch (error) {
      console.error("Error getting location:", error);

      // Specific error messages based on error type
      let errorMessage = "Could not fetch location. Please try again.";

      if (error.code === "E_LOCATION_SETTINGS_UNSATISFIED") {
        errorMessage =
          "Please enable location services in your device settings.";
      } else if (error.code === "E_LOCATION_TIMEOUT") {
        errorMessage = "Location request timed out. Please try again.";
      }

      setLocationError(errorMessage);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <View className="mb-8">
      <Text className="mb-2 text-base font-medium text-gray-900">Location</Text>

      {/* Map placeholder */}
      <View className="h-52 w-full overflow-hidden rounded-2xl bg-purple-50">
        <View className="flex-1 items-center justify-center">
          <Ionicons name="map" size={46} color="#7e22ce" />
          <Text className="mt-2 text-sm text-purple-700">Map Preview</Text>
        </View>
      </View>

      <Pressable
        onPress={handleUseCurrentLocation}
        className={cn(
          "mt-4 h-12 flex-row items-center justify-center rounded-full bg-gray-100 active:scale-[0.98] active:opacity-70",
          isLoadingLocation && "opacity-50",
        )}
        accessibilityRole="button"
        accessibilityLabel="Use current location"
        disabled={isLoadingLocation}
        hitSlop={10}
      >
        <Ionicons name="locate" size={18} color="#111827" />
        <Text className="ml-2 font-medium text-gray-900">
          {isLoadingLocation ? "Fetching Location..." : "Use Current Location"}
        </Text>
      </Pressable>
    </View>
  );
};

LocationSection.propTypes = {};

export default LocationSection;
