import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useLoginForm } from "../../hooks/useLoginForm";

import FormField from "../../components/FormField";
import AuthCTA from "../../components/AuthCTA";

const LogIn = () => {
  const router = useRouter();
  const passwordRef = useRef(null);
  const {
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    loading,
    errors,
    handleLogin,
  } = useLoginForm();

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50"
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="px-6 pt-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-slate-900">
              Welcome back
            </Text>
            <Text className="mt-1 text-base text-slate-500">
              Sign in to continue tracking your spending.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-y-4">
            {/* Email */}
            <FormField
              label={"Email"}
              onChangeText={setEmail}
              placeholder="you@example.com"
              value={email}
              error={errors.email}
              inputProps={{
                autoCapitalize: "none",
                keyboardType: "email-address",
                returnKeyType: "next",
                onSubmitEditing: () => passwordRef.current?.focus(),
              }}
            />

            {/* Password */}
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Minimum 8 characters"
              secure
              show={showPassword}
              onToggleSecure={() => {
                setShowPassword((prev) => !prev);
              }}
              error={errors.password}
              inputProps={{
                ref: passwordRef,
                returnKeyType: "done",
                onSubmitEditing: () => Keyboard.dismiss(),
              }}
            />

            {/* CTA */}
            <AuthCTA
              loading={loading}
              onPrimaryPress={handleLogin}
              primaryLabel={loading ? "Signing in" : "Sign in"}
              secondaryLabel={{
                textPrefix: "Don't have an account? ",
                textAction: "Create account",
              }}
              onSecondaryPress={() => router.push("/sign-up")}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogIn;
