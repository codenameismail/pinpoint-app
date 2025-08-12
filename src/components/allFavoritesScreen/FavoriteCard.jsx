import React from "react";
import PropTypes from "prop-types";

import { View, Text, Image } from "react-native";

const FavoriteCard = ({ favorite }) => {
  return (
    <View className="mb-6 w-[48%]">
      {/* Image Container */}
      <View className="relative mb-3">
        <Image
          source={favorite.image}
          className="h-40 w-full rounded-2xl"
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View>
        <Text
          className="mb-1 text-lg font-semibold text-gray-900"
          numberOfLines={1}
        >
          {favorite.title}
        </Text>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {favorite.location.address.split(",").slice(0, 2).join(", ")}
        </Text>
      </View>
    </View>
  );
};

FavoriteCard.propTypes = {
  favorite: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FavoriteCard;
