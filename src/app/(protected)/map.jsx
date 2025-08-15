import React, { useEffect, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import HeaderBar from "../../components/HeaderBar";

import { useLocationStore } from "../../store/useLocationStore";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useLocationPermission } from "../../hooks/useLocationPermission";

const MapScreen = () => {
  const router = useRouter();

  const { getEstimatedLocation } = useCurrentLocation();
  const { checkPermissions } = useLocationPermission();

  // Get the action from your store to set the FINAL location
  const setPickedLocation = useLocationStore(
    (state) => state.setPickedLocation,
  );

  const { latitude, longitude } = useLocalSearchParams();
  const initialLocation =
    latitude && longitude
      ? {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }
      : null;

  // Use local state for the temporary selection on this screen
  const [currentSelection, setCurrentSelection] = useState(initialLocation);

  const [isLoading, setIsLoading] = useState(Boolean(initialLocation));

  // A single state for the map region
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Set the region based on initialLocation or estimated location
  useEffect(() => {
    if (initialLocation) {
      setMapRegion(() => ({
        ...mapRegion,
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
      }));

      setIsLoading(false);
    } else {
      // get the estimated location
      const getLocation = async () => {
        setIsLoading(true);
        try {
          const estimateLocation = await getEstimatedLocation(checkPermissions);
          if (estimateLocation) {
            setMapRegion({
              ...mapRegion,
              latitude: estimateLocation.latitude,
              longitude: estimateLocation.longitude,
            });
          }
        } catch (error) {
          console.error("Failed to get location:", error);
        } finally {
          setIsLoading(false);
        }
      };

      getLocation();
    }
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    // Update the local state, not the global one
    setCurrentSelection(coordinate);
  };

  const handleConfirm = () => {
    if (currentSelection) {
      // Update the global store with the final choice
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
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#8b5cf6" />
            <Text className="mt-2 text-purple-600">
              Getting your location...
            </Text>
          </View>
        ) : (
          <MapView
            onPress={handleMapPress}
            style={{ flex: 1 }}
            initialRegion={mapRegion}
            showsUserLocation={false}
          >
            {currentSelection && (
              <Marker
                pinColor="purple"
                coordinate={currentSelection}
                title="Selected Location"
              />
            )}
          </MapView>
        )}
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
