import React from "react";
import PropTypes from "prop-types";

import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/**
 * HeaderBar - A navigation header component with a back button
 *
 * @param {Object} props
 * @param {string} props.title - Text to display as the header title
 * @param {Function} [props.onBackPress] - Optional custom function to handle back button press
 *                                        If not provided, defaults to router.back()
 */
const HeaderBar = ({ title, onBackPress }) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between border-b border-gray-100 bg-white py-3">
      <TouchableOpacity
        onPress={handleBackPress}
        className="flex-row items-center"
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={32} color="#374151" />
        <Text className="text-xl font-normal text-gray-700">Back</Text>
      </TouchableOpacity>

      <Text className="text-xl font-bold text-gray-800">{title}</Text>

      <View style={{ width: 70 }} className="" />
    </View>
  );
};

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  onBackPress: PropTypes.func,
};

export default HeaderBar;
