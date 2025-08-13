import React from "react";
import PropTypes from "prop-types";

import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { cn } from "../utils/cn";

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secure = false,
  show = false,
  onToggleSecure,
  inputProps = {},
}) {
  return (
    <View className="gap-y-2">
      {Boolean(label) && (
        <Text className="text-base font-medium text-gray-900">{label}</Text>
      )}
      <View className="relative">
        <TextInput
          className={cn(
            // Base styles
            "h-14 rounded-xl border-[1.5px] bg-white px-4 text-base text-gray-900 focus:scale-[1.01] focus:border-purple-300",
            // Conditional border color
            error ? "border-red-300" : "border-gray-300",
            // Conditional padding based on secure field
            secure ? "pr-16" : "pr-4",
          )}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          secureTextEntry={secure && !show}
          {...inputProps}
        />
        {secure && (
          // Toggle visibility button
          <Pressable
            className="absolute right-3 top-3"
            onPress={onToggleSecure}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={show ? "Hide password" : "Show password"}
          >
            <Ionicons
              name={show ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#64748b"
            />
          </Pressable>
        )}
      </View>
      {Boolean(error) && (
        <Text className="-mt-1 text-xs text-red-600">{error}</Text>
      )}
    </View>
  );
}

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  secure: PropTypes.bool,
  show: PropTypes.bool,
  onToggleSecure: PropTypes.func,
  inputProps: PropTypes.object,
};
