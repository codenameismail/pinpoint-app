import React from "react";
import PropTypes from "prop-types";

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ onBack, title = "Add New Place" }) => (
  <View className="h-[60px] items-center justify-center border-b border-gray-200 bg-white px-4">
    <TouchableOpacity
      onPress={onBack}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className="absolute left-2 top-1/2 z-10 h-12 -translate-y-1/2 transform flex-row items-center gap-x-1 active:scale-75"
      activeOpacity={0.5}
      hitSlop={{ right: 10 }}
    >
      <Ionicons className="" name="chevron-back" size={28} color="#111827" />
      <Text className="text-lg font-normal text-gray-900">Return</Text>
    </TouchableOpacity>

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
