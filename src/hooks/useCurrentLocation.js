import {
  PermissionStatus,
  getCurrentPositionAsync,
  LocationAccuracy,
  getLastKnownPositionAsync,
} from "expo-location";
import { useState, useCallback } from "react";

// Custom hook for current location
export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAccurateLocation = useCallback(async (permissionCheck, accuracy) => {
    // Check permission first
    const permissions = await permissionCheck();
    if (permissions?.status !== PermissionStatus.GRANTED) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const location = await getCurrentPositionAsync({
        accuracy: accuracy || LocationAccuracy.High,
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
  }, []);

  const getEstimatedLocation = useCallback(async (permissionCheck) => {
    const permissions = await permissionCheck();
    if (permissions?.status !== PermissionStatus.GRANTED) {
      return null;
    }
    try {
      const location = await getLastKnownPositionAsync({
        maxAge: 60000, // Use a cached location up to 1 minute old
      });
      if (location) {
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      }
    } catch (error) {
      console.log("Could not get estimated location", error);
    }
    return null;
  }, []);

  return {
    currentLocation,
    isLoading,
    error,
    getAccurateLocation,
    getEstimatedLocation,
  };
};
