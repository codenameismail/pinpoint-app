import {
  getForegroundPermissionsAsync,
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert, AppState, Linking } from "react-native";

// Custom hook for location permissions
export const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Check permissions when app comes to foreground
  useEffect(() => {
    // Initial check
    checkPermissions();

    // Setup AppState listener to detect when app returns from settings
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        // Re-check permissions when app comes back to foreground
        checkPermissions();
      }
    });

    // Cleanup subscription
    return () => {
      subscription.remove();
    };
  }, []);

  const checkPermissions = async () => {
    try {
      const permissions = await getForegroundPermissionsAsync();
      setPermissionStatus(permissions);
      setPermissionDenied(permissions.status !== PermissionStatus.GRANTED);
      return permissions;
    } catch (error) {
      console.error("Error checking permissions:", error);
      setPermissionDenied(true);
      return null;
    }
  };

  // Direct request (for "Allow Location Access" button) - no alert, go straight to settings if needed
  const requestPermission = async () => {
    try {
      // Handle undetermined status
      if (permissionStatus?.status === PermissionStatus.UNDETERMINED) {
        const result = await requestForegroundPermissionsAsync();
        setPermissionStatus(result);
        setPermissionDenied(result.status !== PermissionStatus.GRANTED);
        return result;
      }

      // If permanently denied, go straight to settings (no alert)
      if (permissionStatus?.canAskAgain === false) {
        Linking.openSettings();
        return null;
      }

      // Request permission
      const result = await requestForegroundPermissionsAsync();
      setPermissionStatus(result);
      setPermissionDenied(result.status !== PermissionStatus.GRANTED);
      return result;
    } catch (error) {
      console.error("Error requesting permission:", error);
      setPermissionDenied(true);
      return null;
    }
  };

  // Request with alert (for map interactions) - show alert first
  const requestPermissionWithAlert = async () => {
    try {
      // Handle undetermined status
      if (permissionStatus?.status === PermissionStatus.UNDETERMINED) {
        const result = await requestForegroundPermissionsAsync();
        setPermissionStatus(result);
        setPermissionDenied(result.status !== PermissionStatus.GRANTED);
        return result;
      }

      // Handle permanently denied with alert
      if (permissionStatus?.canAskAgain === false) {
        Alert.alert(
          "Permission Required",
          "Location permission has been permanently denied. Please enable it manually in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ],
        );
        return null;
      }

      // Request permission
      const result = await requestForegroundPermissionsAsync();
      setPermissionStatus(result);
      setPermissionDenied(result.status !== PermissionStatus.GRANTED);
      return result;
    } catch (error) {
      console.error("Error requesting permission:", error);
      setPermissionDenied(true);
      return null;
    }
  };

  return {
    permissionStatus,
    permissionDenied,
    requestPermission, // Direct to settings (for dedicated button)
    requestPermissionWithAlert, // Shows alert first (for map interactions)
    checkPermissions,
  };
};
