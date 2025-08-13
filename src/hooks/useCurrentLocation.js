import {
  PermissionStatus,
  getCurrentPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { useState } from "react";

// Custom hook for current location
export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = async (permissionCheck) => {
    // Check permission first
    const permissions = await permissionCheck();
    if (permissions?.status !== PermissionStatus.GRANTED) {
      return;
    }

    setError(null);
    setIsLoading(true);

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
    } catch (error) {
      console.error("Error getting location:", error);

      let errorMessage = "Could not fetch location. Please try again.";
      if (error.code === "E_LOCATION_SETTINGS_UNSATISFIED") {
        errorMessage =
          "Please enable location services in your device settings.";
      } else if (error.code === "E_LOCATION_TIMEOUT") {
        errorMessage = "Location request timed out. Please try again.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentLocation,
    isLoading,
    error,
    getCurrentLocation,
  };
};
