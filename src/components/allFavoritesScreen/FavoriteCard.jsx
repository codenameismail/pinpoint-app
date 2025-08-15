import React from "react";
import PropTypes from "prop-types";

import { useRouter } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";

const FavoriteCard = ({ favorite }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(protected)/favorite/[id]",
      params: { id: favorite.id },
    });
  };

  const address =
    favorite.location.address?.split(",").slice(0, 2).join(", ") || "Unknown";
  return (
    <Pressable
      onPress={handlePress}
      className="w-[48%] rounded-2xl bg-gray-100 p-2 pb-4 shadow-md shadow-gray-300 active:scale-95 active:opacity-90"
    >
      {/* Image Container */}
      <View className="relative mb-3 w-full">
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
          {address}
        </Text>
      </View>
    </Pressable>
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
