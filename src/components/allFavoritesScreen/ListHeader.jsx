import React from "react";

import { View, Text } from "react-native";

const ListHeader = () => {
  return (
    <View className="flex-row items-center justify-between px-6 pb-6 pt-8">
      <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
    </View>
  );
};

export default ListHeader;
