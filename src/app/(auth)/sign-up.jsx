import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useSignUpForm } from "../../hooks/useSignUpForm";

import FormField from "../../components/FormField";
import AuthCTA from "../../components/AuthCTA";

const CreateAccountScreen = () => {
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {
    name,
    setName,
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    loading,
    errors,
    handleSignUp,
  } = useSignUpForm();

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50"
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="px-6 pt-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-slate-900">
              Create account
            </Text>
            <Text className="mt-1 text-base text-slate-500">
              Start tracking your spending today.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-y-4">
            {/* Name */}
            <FormField
              label="Full name"
              value={name}
              onChangeText={setName}
              placeholder="Mohammed Ali"
              error={errors.name}
              inputProps={{
                autoCapitalize: "words",
                returnKeyType: "next",
                onSubmitEditing: () => emailRef.current?.focus(),
              }}
            />

            {/* Email */}
            <FormField
              label={"Email"}
              onChangeText={setEmail}
              placeholder="you@example.com"
              value={email}
              error={errors.email}
              inputProps={{
                ref: emailRef,
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
              }}
            />

            {/* CTA and Secondary action */}
            <AuthCTA
              loading={loading}
              onPrimaryPress={handleSignUp}
              primaryLabel={loading ? "Creating account" : "Create account"}
              secondaryLabel={{
                textPrefix: "Already have an account? ",
                textAction: "Sign in",
              }}
              onSecondaryPress={() => router.push("/login")}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;
