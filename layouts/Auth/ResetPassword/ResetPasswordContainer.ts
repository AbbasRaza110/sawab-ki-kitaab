import apiClient from "@/services/apiService";
import { useLocalSearchParams } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { Alert } from "react-native";

export default function useResetPassword() {
  const { email, otp } = useLocalSearchParams();
  console.log("asdasdas", email, otp);

  const [isLoading, setIsLoading] = React.useState(false);
  const [resetPasswordCredentials, setResetPasswordCredentials] =
    React.useState({
      password: "",
      confirmPassword: "",
    });

  const handleResetPassword = async () => {
    try {
      console.log("@@@@@@", resetPasswordCredentials);

      setIsLoading(true);
      const response = await apiClient.post("/auth/reset-password", {
        ...resetPasswordCredentials,
        email,
        otp,
      });
      console.log("Reset Password Response:", response.data);
      navigate("/(auth)/sign_in");
      Alert.alert("Success", "Your password has been reset successfully!");
    } catch (error: any) {
      Alert.alert("Reset Password Failed", error?.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleResetPassword,
    setResetPasswordCredentials,
    resetPasswordCredentials,
    isLoading,
  };
}
