import apiClient from "@/services/apiService";
import { dismissTo } from "expo-router/build/global-state/routing";
import React from "react";
import { Alert } from "react-native";

export default function useSignUp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/auth/register", credentials);
      Alert.alert("Success", "You are successfully registered!");

      dismissTo("/(auth)");
    } catch (error: any) {
      Alert.alert("Registration Failed", error?.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignUp,
    credentials,
    setCredentials,
    isLoading,
  };
}
