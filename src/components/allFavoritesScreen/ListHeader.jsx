import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";

const ListHeader = () => {
  return (
    <View className="flex-row items-center justify-between px-6 pb-6 pt-8">
      <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={24} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
};

export default ListHeader;
