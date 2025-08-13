import React from "react";
import PropTypes from "prop-types";

import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LocationSection = ({ onUseCurrentLocation }) => (
  <View className="mb-6">
    <Text className="mb-2 text-base font-medium text-gray-900">Location</Text>

    {/* Map placeholder */}
    <View className="h-48 w-full overflow-hidden rounded-2xl bg-purple-50">
      <View className="flex-1 items-center justify-center">
        <Ionicons name="map" size={46} color="#7e22ce" />
        <Text className="mt-2 text-sm text-purple-700">Map Preview</Text>
      </View>
    </View>

    <Pressable
      onPress={onUseCurrentLocation}
      className="mt-4 h-12 flex-row items-center justify-center rounded-full bg-gray-100 active:opacity-90"
      accessibilityRole="button"
      accessibilityLabel="Use current location"
    >
      <Ionicons name="locate" size={18} color="#111827" />
      <Text className="ml-2 font-medium text-gray-900">
        Use Current Location
      </Text>
    </Pressable>
  </View>
);

LocationSection.propTypes = {
  onUseCurrentLocation: PropTypes.func.isRequired,
};

export default LocationSection;