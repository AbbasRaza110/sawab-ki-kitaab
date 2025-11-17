import apiClient from "@/services/apiService";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { Alert } from "react-native";

export default function useForgotPassword() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleForgotPassword = async () => {
    try {
      console.log("@@@@@@", email);

      setIsLoading(true);
      const response = await apiClient.post("/auth/forgot-password", { email });
      const params = { email, otp: response.data.testOtp };
      console.log("Forgot Password Response:", response.data, params);
      push({ pathname: "/(auth)/reset_password", params });
    } catch (error: any) {
      Alert.alert("Forgot Password Failed", error?.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleForgotPassword,
    setEmail,
    email,
    isLoading,
  };
}
