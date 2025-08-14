import React from "react";
import PropTypes from "prop-types";

import { Ionicons } from "@expo/vector-icons";

import { View, Text, Pressable } from "react-native";

const PermissionDeniedUI = ({ requestPermission }) => {
  return (
    <View className="my-2 rounded-lg border border-orange-200 bg-orange-50 p-4">
      <View className="mb-2 flex-row items-center justify-center">
        <Ionicons name="warning" size={20} color="#ea580c" />
        <Text className="ml-2 text-sm font-medium text-orange-800">
          Location Access Needed
        </Text>
      </View>
      <Text className="mb-4 text-center text-sm text-orange-700">
        Please enable location permissions in your device settings to select a
        location.
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
  );
};

PermissionDeniedUI.propTypes = {
  requestPermission: PropTypes.func.isRequired,
};

export default PermissionDeniedUI;
