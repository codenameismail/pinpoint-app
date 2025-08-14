import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { View, Text, Pressable, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { cn } from "../../utils/cn";

import { useLocationPermission } from "../../hooks/useLocationPermission";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import InputHeader from "./InputHeader";
import PermissionDeniedUI from "./PermissionDeniedUI";

const LocationPicker = ({
  selectedLocation,
  onLocationSelected,
  onResetLocation,
}) => {
  const router = useRouter();

  const {
    permissionDenied,
    requestPermission,
    requestPermissionWithAlert,
    checkPermissions,
  } = useLocationPermission();

  const {
    currentLocation,
    isLoading,
    error,
    getAccurateLocation,
    getEstimatedLocation,
  } = useCurrentLocation();

  // Get initial estimated location (may not be accurate)
  useEffect(() => {
    if (!selectedLocation) {
      const fetchEstimatedLocation = async () => {
        const estimateLocation = await getEstimatedLocation(checkPermissions);
        if (estimateLocation) {
          onLocationSelected(estimateLocation);
        }
      };

      fetchEstimatedLocation();
    }
  }, []);

  useEffect(() => {
    console.log("Current location mounted: ", currentLocation);
    console.log("Selected location mounted: ", selectedLocation);
  }, [currentLocation]);

  // Handle current location button press
  const handleUseCurrentLocation = async () => {
    if (permissionDenied) {
      await requestPermissionWithAlert();
    } else {
      // Get location and use it directly
      const locationData = await getAccurateLocation(checkPermissions);
      console.log("Got location data:", locationData);
      if (locationData) {
        onLocationSelected(locationData);
      }
    }
  };

  // Handle map location selection
  const handleOpenFullMap = () => {
    router.push({
      pathname: "/(protected)/map",
      params: selectedLocation
        ? {
            latitude: selectedLocation.latitude.toString(),
            longitude: selectedLocation.longitude.toString(),
          }
        : {},
    });
  };

  // function to handle resetting the selected location
  const handleResetLocation = () => {
    onResetLocation(null);
  };

  return (
    <View className="mb-8">
      <View className="mb-2 flex-row items-center justify-between">
        <InputHeader title={"Location"} />
        <Pressable
          onPress={handleResetLocation}
          className="group h-8 w-8 items-center justify-center rounded-full bg-gray-200 active:scale-[0.98] active:opacity-80 disabled:opacity-50"
          hitSlop={25}
          disabled={isLoading}
        >
          <Ionicons
            className="group-active:scale-[0.98] group-active:opacity-70"
            name="refresh"
            size={18}
            color="#4b5563"
          />
        </Pressable>
      </View>

      {/* Permission Denied UI */}
      {permissionDenied && (
        <PermissionDeniedUI requestPermission={requestPermission} />
      )}

      {/* Location Display */}
      <View className="mt-2 rounded-xl border border-gray-300 bg-white px-2 py-4">
        <View className="flex-row items-center">
          <Ionicons name="location" size={20} color="#6b7280" />
          <Text className="ml-2 text-base text-gray-700">
            {selectedLocation
              ? `${selectedLocation.latitude.toFixed(6)}, ${selectedLocation.longitude.toFixed(6)}`
              : "Select a location"}
          </Text>
        </View>

        <View className="mt-4">
          {/* Map preview or placeholder */}
          <View className="min-h-56 overflow-hidden rounded-xl">
            {selectedLocation ? (
              <MapView
                style={{ flex: 1 }}
                region={{
                  ...selectedLocation,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                scrollEnabled={true}
                zoomEnabled={true}
              >
                <Marker coordinate={selectedLocation} pinColor="purple" />
              </MapView>
            ) : (
              <View
                className={cn("flex-1 items-center justify-center bg-gray-100")}
              >
                {isLoading ? (
                  <>
                    <ActivityIndicator size="small" color="#6b7280" />
                    <Text className="mt-2 text-sm text-gray-500">
                      Getting location...
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="map-outline" size={32} color="#9ca3af" />
                    <Text className="mt-2 text-sm text-gray-500">
                      No location selected
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>

          {/* Location options - Current and Manual Map */}
          <View className="mt-4 flex-row gap-x-2">
            <Pressable
              onPress={handleUseCurrentLocation}
              className={cn(
                "h-12 flex-1 flex-row items-center justify-center rounded-full bg-gray-100 active:scale-[0.98] active:opacity-80",
                isLoading && "opacity-70",
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#6b7280" />
              ) : (
                <>
                  <Ionicons name="locate" size={18} color="#6b7280" />
                  <Text className="ml-2 font-medium text-gray-700">
                    Current Location
                  </Text>
                </>
              )}
            </Pressable>

            <Pressable
              onPress={handleOpenFullMap}
              className="h-12 flex-1 flex-row items-center justify-center rounded-full bg-purple-100 active:scale-[0.98] active:opacity-80 disabled:opacity-50"
              disabled={isLoading}
            >
              <Ionicons name="map" size={18} color="#7e22ce" />
              <Text className="ml-2 font-medium text-purple-700">
                Select on Map
              </Text>
            </Pressable>
          </View>

          {error && <Text className="mt-2 text-sm text-red-500">{error}</Text>}
        </View>
      </View>
    </View>
  );
};

LocationPicker.propTypes = {
  selectedLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    address: PropTypes.string,
  }),
  onLocationSelected: PropTypes.func.isRequired,
  onResetLocation: PropTypes.func.isRequired,
};

export default LocationPicker;
