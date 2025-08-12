import React from "react";
import PropTypes from "prop-types";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FavoriteCard from "./FavoriteCard";

/** * FavoriteList component to display a list of favorite locations.
 * It uses FlatList for efficient rendering of items.
 * Each favorite is rendered using the FavoriteCard component.
 * * @param {Object} props - Component properties.
 * @param {Array} props.favorites - Array of favorite locations to display.
 * * @returns {JSX.Element} Rendered FavoriteList component.
 */
const FavoriteList = ({ favorites }) => {
  return (
    <FlatList
      data={favorites}
      renderItem={({ item: favorite }) => <FavoriteCard favorite={favorite} />}
      keyExtractor={(favorite) => favorite.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      ListHeaderComponent={() => (
        <View className="flex-row items-center justify-between px-6 pb-6 pt-12">
          <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

FavoriteList.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.any.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default FavoriteList;
