import React from "react";
import PropTypes from "prop-types";

import { Text } from "react-native";

const InputHeader = ({ title }) => {
  return <Text className="text-lg font-semibold text-gray-900">{title}</Text>;
};

InputHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default InputHeader;
