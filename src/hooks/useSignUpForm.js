import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { useAuthStore } from "../store/useAuthStore";

import { formatDate } from "../utils/helpers";

export const useSignUpForm = () => {
  const router = useRouter();
  const authenticate = useAuthStore((state) => state.authenticate);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(formatDate(new Date()));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setDob(formatDate(new Date()));
    setShowPassword(false);
    setErrors({});
    setLoading(false);
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

    // 4. If validation passes, try to create the user
    try {
      // const result = await createUser(email, password);
      // authenticate(result); // Store user data in zustand store
      authenticate("user signed up"); // Store user data in zustand store
      console.log("Sign up successful, navigating to protected routes");
      router.replace("/(protected)");
    } catch (error) {
      // 5. Handle any errors from the API
      setErrors({ api: error.message });
      Alert.alert("Error", error.message);
      console.error("Create user error:", error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
      clearForm(); // Clear the form inputs
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
