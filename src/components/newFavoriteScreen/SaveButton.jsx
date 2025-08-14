import React from "react";
import PropTypes from "prop-types";

import { Text, Pressable, ActivityIndicator } from "react-native";

const SaveButton = ({ onPress, disabled = false, isLoading = false }) => {
  return (
    <Pressable
      onPress={onPress}
      className="mt-2 h-14 items-center justify-center rounded-full bg-purple-700 active:scale-[0.98] active:bg-purple-400"
      accessibilityRole="button"
      accessibilityLabel="Save place"
      disabled={disabled || isLoading}
      style={{ opacity: (disabled || isLoading) ? 0.5 : 1 }}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-base font-semibold text-white">Save Place</Text>
      )}
    </Pressable>
  );
};

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default SaveButton;
