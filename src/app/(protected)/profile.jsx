import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../utils/supabase";

const ProfileScreen = () => {
  // Function to handle sign out
  const signUserOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      console.log("User signed out successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Sign out error:", error);
    }
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          signUserOut();
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50 px-6"
      edges={["top", "left", "right"]}
    >
      <View className="pt-10">
        <Text className="mb-8 text-3xl font-bold text-slate-900">Profile</Text>

        {/* User Info Section */}
        <View className="mb-6 rounded-xl bg-white p-4 shadow-sm shadow-slate-300">
          <View className="flex-row items-center">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Ionicons name="person" size={24} color="#3b82f6" />
            </View>
            <View>
              <Text className="text-lg font-semibold text-slate-900">
                {"User"}
              </Text>
              <Text className="text-sm text-slate-500">Account holder</Text>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View className="mb-6 rounded-xl bg-white shadow-sm shadow-slate-300">
          {/* You can add more settings here */}
          <Pressable className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <Ionicons name="settings-outline" size={20} color="#64748b" />
              <Text className="ml-3 text-base text-slate-900">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#64748b" />
          </Pressable>
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={handleSignOut}
          className="flex-row items-center justify-center rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="ml-2 text-base font-semibold text-red-500">
            Sign Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
