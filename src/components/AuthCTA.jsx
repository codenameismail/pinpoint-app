import React from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const AuthCTA = ({
  loading,
  onPrimaryPress,
  primaryLabel,
  secondaryLabel,
  onSecondaryPress,
  disabled,
}) => {
  return (
    <>
      {/* Primary CTA */}
      <Pressable
        className="mt-2 h-12 items-center justify-center rounded-xl bg-slate-900 shadow-sm shadow-slate-300 active:opacity-90"
        onPress={onPrimaryPress}
        disabled={loading || disabled}
      >
        {loading ? (
          <View className="flex-row items-center gap-x-2">
            <Text className="text-base font-semibold text-white opacity-50">
              {primaryLabel}
            </Text>
            <ActivityIndicator />
          </View>
        ) : (
          <Text className="text-base font-semibold text-white">
            {primaryLabel}
          </Text>
        )}
      </Pressable>

      {/* Secondary action */}
      <View className="mt-4 flex-row justify-center">
        <Text className="text-sm text-slate-500">
          {secondaryLabel.textPrefix}
        </Text>
        <TouchableOpacity
          onPress={onSecondaryPress}
          hitSlop={10}
          disabled={loading || disabled}
        >
          <Text className="text-sm font-semibold text-blue-600">
            {secondaryLabel.textAction}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

AuthCTA.propTypes = {
  loading: PropTypes.bool.isRequired,
  onPrimaryPress: PropTypes.func.isRequired,
  primaryLabel: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.shape({
    textPrefix: PropTypes.string.isRequired,
    textAction: PropTypes.string.isRequired,
  }).isRequired,
  onSecondaryPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default AuthCTA;
