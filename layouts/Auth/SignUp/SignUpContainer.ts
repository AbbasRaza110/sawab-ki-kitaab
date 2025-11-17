import apiClient from "@/services/apiService";
import { navigate } from "expo-router/build/global-state/routing";
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
      console.log("@@@@@@", credentials);

      setIsLoading(true);
      const response = await apiClient.post("/auth/register", credentials);
      console.log("SignUp Response:", response.data);
      Alert.alert("Success", "You are successfully registered!");
      navigate("/(auth)/sign_in");
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
