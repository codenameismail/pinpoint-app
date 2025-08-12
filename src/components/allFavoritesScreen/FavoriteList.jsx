import React from "react";
import PropTypes from "prop-types";

import { FlatList } from "react-native";

import FavoriteCard from "./FavoriteCard";
import ListHeader from "./ListHeader";

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
        rowGap: 16,
        paddingBottom: 60,
      }}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      ListHeaderComponent={() => <ListHeader />}
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
