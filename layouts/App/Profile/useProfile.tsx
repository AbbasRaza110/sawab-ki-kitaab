import apiClient from "@/services/apiService";
import useAuthStore from "@/store/AuthStore";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export interface UserData {
  email?: string;
  name?: string;
  id?: string;
}
export default function useProfile() {
  const { isAuth, setIsAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({});

  async function me() {
    try {
      const response = await apiClient.get("/auth/me");
      if (response.status === 200) {
        console.log("Me Profile Success", response.data);
        setUserData(response.data);
      }
    } catch (error: any) {
      console.log("Me Failed", error?.response.data.message);
      if (error?.response.status == 401) {
        setIsAuth(false);
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      me();
    }, [])
  );

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const resonse = await apiClient.post("/auth/logout");
      if (resonse.status === 201) {
        setIsAuth(false);
      }
      Alert.alert("Success", "Logged out successfully");
    } catch (error) {
      console.log("Logout Failed", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuth,
    userData,
    isLoading,
    handleLogout,
  };
}
