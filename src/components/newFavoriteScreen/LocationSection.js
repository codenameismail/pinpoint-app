import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { View, Text, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { cn } from "../../utils/cn";

import { useLocationPermission } from "../../hooks/useLocationPermission";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import InputHeader from "./InputHeader";

const LocationSection = ({ onUseCurrentLocation }) => {
  const { latitude, longitude } = useLocalSearchParams(); // Get individual params
  const router = useRouter();

  const [displayLocation, setDisplayLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [estimatedLocation, setEstimatedLocation] = useState(null);

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

  // Get a quick location estimate on mount
  useEffect(() => {
    const fetchEstimatedLocation = async () => {
      const estimate = await getEstimatedLocation(checkPermissions);
      if (estimate) {
        setEstimatedLocation(estimate);
      }
    };

    fetchEstimatedLocation();
  }, []);

  // Parse the selected location from params
  useEffect(() => {
    if (latitude && longitude) {
      const parsedLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      setSelectedLocation(parsedLocation);
      setDisplayLocation(parsedLocation);
    }
  }, [latitude, longitude]);

  // Update display location when current location changes (if no manual selection)
  useEffect(() => {
    if (!selectedLocation && currentLocation) {
      setDisplayLocation(currentLocation);
    }
  }, [currentLocation, selectedLocation]);

  // Pass location data up whenever it changes
  useEffect(() => {
    if (displayLocation) {
      onUseCurrentLocation(displayLocation);
    }
  }, [displayLocation, onUseCurrentLocation]);

  // function for when the user clicks the "Use Current Location" button
  const handleLocationPress = () => {
    if (permissionDenied) {
      requestPermissionWithAlert();
    } else {
      getAccurateLocation(checkPermissions);
    }
  };

  // function to handle resetting the selected location
  const handleResetLocation = () => {
    setSelectedLocation(null);
    setDisplayLocation(null);
    setEstimatedLocation(null);
    onUseCurrentLocation(null);
  };

  // function for when the user clicks the preview map
  const handleMapPress = () => {
    if (permissionDenied) {
      requestPermissionWithAlert();
      return;
    }
    // Navigate to the map screen with the current location
    const locationToSend =
      selectedLocation || currentLocation || estimatedLocation;
    if (locationToSend) {
      router.push({
        pathname: "/(protected)/map",
        params: {
          latitude: locationToSend.latitude.toString(),
          longitude: locationToSend.longitude.toString(),
        },
      });
      return;
    }
    // If no current location, just navigate to the map
    router.push("/(protected)/map");
  };

  return (
    <View className="mb-8">
      {/* Title and Reset button */}
      <View className="mb-2 flex-row items-center justify-between">
        <InputHeader title={"Location"} />
        <Pressable
          onPress={handleResetLocation}
          className="group h-8 w-8 items-center justify-center rounded-full bg-gray-200 active:scale-[0.98] active:opacity-80"
          hitSlop={25}
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
            onPress={requestPermission}
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
        disabled={!!currentLocation || !!selectedLocation} // Disable if location is already set
        hitSlop={10}
      >
        {displayLocation ? (
          <MapView
            style={{ flex: 1 }}
            region={{
              ...displayLocation,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={!selectedLocation} // Only show user location if not manually selected
            showsMyLocationButton={false}
          >
            <Marker
              coordinate={displayLocation}
              title={selectedLocation ? "Selected Location" : "Your Location"}
              description={
                selectedLocation ? "Tap to change" : "Current location"
              }
              pinColor={selectedLocation ? "purple" : "red"}
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

      {/* Show selected location info and option to change */}
      {displayLocation && (
        <View className="mt-4 rounded-lg bg-green-50 p-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                <Text className="ml-2 text-sm font-medium text-green-800">
                  Location Selected
                </Text>
              </View>
              <Text className="mt-1 text-xs text-green-700">
                Lat: {displayLocation.latitude.toFixed(6)}, Lng:{" "}
                {displayLocation.longitude.toFixed(6)}
              </Text>
            </View>
            <Pressable
              onPress={handleMapPress}
              className="ml-2 rounded-lg bg-green-600 px-3 py-1 active:scale-[0.98]"
            >
              <Text className="text-xs font-medium text-white">Change</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Current Location Button - Hide if location is available */}
      {!displayLocation && (
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
      )}
    </View>
  );
};

LocationSection.propTypes = {
  onUseCurrentLocation: PropTypes.func.isRequired,
};

export default LocationSection;
