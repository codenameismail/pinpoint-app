import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

import { supabase } from "../utils/supabase";
import { DUMMY_USERS } from "../data/dummy-user";

export const useLoginForm = () => {
  const [email, setEmail] = useState(DUMMY_USERS[0].email || "");
  const [password, setPassword] = useState(DUMMY_USERS[0].password || "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const validate = () => {
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Enter a valid email.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 8) {
      validationErrors.password = "Minimum 8 characters.";
    }

    return validationErrors;
  };

  const handleLogin = async () => {
    // 1. Clear old errors and start loading
    setErrors({});
    setLoading(true);

    // 2. Validate the form inputs
    const validationErrors = validate();

    // 3. Check if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      console.error("Validation errors:", validationErrors);
      return; // End the function here
    }

    // 4. If validation passes, try to login the user
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw error; // If there's an error, throw it to be caught below
      }
      console.log("User Logged in successfully:", data);
      router.replace("/(protected)"); // Redirect to the protected area
    } catch (error) {
      // 5. Handle any errors from the API
      setErrors({ api: error.message });
      Alert.alert("Error", error.message);
      console.error("Login error:", error.message);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return {
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    loading,
    errors,
    handleLogin,
  };
};
