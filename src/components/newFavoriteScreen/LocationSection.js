import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { cn } from "../../utils/cn";
import { useLocationPermission } from "../../hooks/useLocationPermission";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";

const LocationSection = () => {
  const {
    permissionDenied,
    requestPermission,
    requestPermissionWithAlert,
    checkPermissions,
  } = useLocationPermission();
  const { currentLocation, isLoading, error, getCurrentLocation } =
    useCurrentLocation();

  // function for when the user clicks the "Use Current Location" button
  const handleLocationPress = () => {
    if (permissionDenied) {
      requestPermissionWithAlert();
    } else {
      getCurrentLocation(checkPermissions);
    }
  };

  // function for when the user clicks the preview map
  const handleMapPress = () => {
    if (permissionDenied) {
      requestPermissionWithAlert();
    } else {
      // Logic to handle map interaction
    }
  };

  return (
    <View className="mb-8">
      <Text className="mb-2 text-base font-medium text-gray-900">Location</Text>

      {/* Permission Denied UI */}
      {permissionDenied && (
        <View className="my-2 rounded-lg border border-orange-200 bg-orange-50 p-4">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="warning" size={20} color="#ea580c" />
            <Text className="ml-2 text-sm font-medium text-orange-800">
              Location Access Needed
            </Text>
          </View>
          <Text className="mb-3 text-sm text-orange-700">
            Location permission is required to use current location features.
          </Text>
          <Pressable
            onPress={requestPermission} // Direct to settings, no alert
            className="rounded-lg bg-orange-600 px-4 py-2 active:scale-[0.98] active:opacity-80"
            accessibilityRole="button"
          >
            <Text className="text-center text-sm font-medium text-white">
              Allow Location Access
            </Text>
          </Pressable>
        </View>
      )}

      {/* Map Display */}
      <Pressable
        onPress={handleMapPress}
        className="group min-h-56 w-full overflow-hidden rounded-2xl bg-purple-50 active:scale-[0.98] active:opacity-70"
        accessibilityRole="button"
        disabled={!!currentLocation} // Disable if location is already set
      >
        {currentLocation ? (
          <MapView
            style={{ flex: 1 }}
            region={{
              ...currentLocation,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            showsMyLocationButton={false}
          >
            <Marker
              coordinate={currentLocation}
              title="Your Location"
              description="Current location"
            />
          </MapView>
        ) : (
          <View className="flex-1 items-center justify-center p-6">
            <View className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <Ionicons name="map-outline" size={32} color="#7e22ce" />
            </View>
            <Text className="mb-2 text-center text-base font-medium text-gray-700">
              Choose Location
            </Text>
            <Text className="text-center text-sm text-gray-500">
              Tap to select your favorite place on the map
            </Text>
            <View className="mt-4 flex-row items-center rounded-full bg-purple-700 px-4 py-2">
              <Ionicons name="location" size={16} color="white" />
              <Text className="ml-1 text-sm font-medium text-white">
                Select on Map
              </Text>
            </View>
          </View>
        )}
      </Pressable>

      {/* Error Display */}
      {error && (
        <View className="mt-2 rounded-lg bg-red-50 p-3">
          <Text className="text-sm text-red-700">{error}</Text>
        </View>
      )}

      {/* Current Location Button */}
      <Pressable
        onPress={handleLocationPress}
        className={cn(
          "mt-4 h-12 flex-row items-center justify-center rounded-full bg-gray-100 active:scale-[0.98] active:opacity-70",
          (isLoading || permissionDenied) && "opacity-50",
        )}
        accessibilityRole="button"
        hitSlop={10}
      >
        <Ionicons name="locate" size={18} color="#111827" />
        <Text className="ml-2 font-medium text-gray-900">
          {isLoading ? "Fetching Location..." : "Use Current Location"}
        </Text>
      </Pressable>
    </View>
  );
};

export default LocationSection;
