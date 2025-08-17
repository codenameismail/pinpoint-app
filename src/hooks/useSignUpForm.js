import { useState } from "react";
import { Alert } from "react-native";

import { formatDate } from "../utils/helpers";
import { supabase } from "../utils/supabase";

import { DUMMY_USERS } from "../data/dummy-user";
import { useRouter } from "expo-router";

export const useSignUpForm = () => {
  const [name, setName] = useState(DUMMY_USERS[0].name || "");
  const [email, setEmail] = useState(DUMMY_USERS[0].email || "");
  const [password, setPassword] = useState(DUMMY_USERS[0].password || "");
  const [dob, setDob] = useState(formatDate(new Date()));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const validate = () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Full name is required.";
    }

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

  const handleSignUp = async () => {
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

    // 4. If validation passes, proceed to create the user
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        throw error; // If there's an error, throw it to be caught below
      }
      console.log("User created successfully:", Object.keys(data.user));
      router.replace("/(protected)"); // Redirect to the protected area
    } catch (error) {
      // 5. Handle any errors from the API
      setErrors({ api: error.message });
      Alert.alert("Error", error.message);
      console.error("Create user error:", error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return {
    name,
    setName,
    password,
    setPassword,
    email,
    setEmail,
    dob,
    setDob,
    showPassword,
    setShowPassword,
    loading,
    errors,
    handleSignUp,
  };
};
