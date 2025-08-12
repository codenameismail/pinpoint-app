import React from "react";

import PropTypes from "prop-types";

import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const FabButton = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="group absolute bottom-8 right-8 h-14 w-14 items-center justify-center rounded-full bg-purple-700 shadow-lg shadow-purple-300 active:scale-95 active:opacity-80"
    >
      <Ionicons
        name="add"
        size={28}
        color="white"
        className="group-active:scale-95"
      />
    </Pressable>
  );
};

FabButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default FabButton;
