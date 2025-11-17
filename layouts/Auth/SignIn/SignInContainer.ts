import apiClient from "@/services/apiService";
import useAuthStore from "@/store/AuthStore";
import React from "react";
import { Alert } from "react-native";

export default function useSignIn() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const { setIsAuth } = useAuthStore();
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/auth/login", credentials);
      if (response.status == 201) setIsAuth(true);
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.response.data.message || "Invalid credentials"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    credentials,
    setCredentials,
    isLoading,
  };
}
