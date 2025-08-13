import React from "react";
import PropTypes from "prop-types";

import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HeaderBar = ({ title }) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between border-b border-gray-100 bg-white py-3">
      <TouchableOpacity
        onPress={() => router.back()}
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
};

export default HeaderBar;
