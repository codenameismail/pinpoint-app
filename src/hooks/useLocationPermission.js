import { useIsFocused } from "@react-navigation/native";
import {
  getForegroundPermissionsAsync,
  PermissionStatus,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState, useEffect } from "react";
import { Alert, Linking, AppState } from "react-native";

// Custom hook for location permissions
export const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const isFocused = useIsFocused();

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

  const requestPermission = async () => {
    try {
      // Handle undetermined status
      if (permissionStatus?.status === PermissionStatus.UNDETERMINED) {
        const result = await requestForegroundPermissionsAsync();
        setPermissionStatus(result);
        setPermissionDenied(result.status !== PermissionStatus.GRANTED);
        return result;
      }

      // Handle permanently denied
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

  // Check permissions on mount and focus
  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (isFocused) checkPermissions();
  }, [isFocused]);

  // Listen for app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        setTimeout(checkPermissions, 100);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    return () => subscription?.remove();
  }, []);

  return {
    permissionStatus,
    permissionDenied,
    requestPermission,
    checkPermissions,
  };
};
