import React from "react";
import PropTypes from "prop-types";

import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ onBack, title = "Add New Place" }) => (
  <View className="relative h-[60px] items-center justify-center border-b border-gray-200 px-4">
    <Pressable
      onPress={onBack}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform flex-row items-center gap-x-1 active:scale-[0.98] active:opacity-80"
    >
      <Ionicons name="chevron-back" size={28} color="#111827" />
      <Text className="text-lg font-medium text-gray-900">Back</Text>
    </Pressable>

    <Text className="text-center text-2xl font-semibold text-gray-900">
      {title}
    </Text>
  </View>
);

Header.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Header;
