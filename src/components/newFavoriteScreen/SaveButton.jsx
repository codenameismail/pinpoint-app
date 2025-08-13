import React from "react";
import PropTypes from "prop-types";

import { Text, Pressable } from "react-native";

const SaveButton = ({ onPress, disabled = false }) => {
  return (
    <Pressable
      onPress={onPress}
      className="mt-2 h-14 items-center justify-center rounded-full bg-purple-700 active:opacity-90"
      accessibilityRole="button"
      accessibilityLabel="Save place"
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <Text className="text-base font-semibold text-white">Save Place</Text>
    </Pressable>
  );
};

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SaveButton;
