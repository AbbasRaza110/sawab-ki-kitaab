import apiClient from "@/services/apiService";
import useAuthStore from "@/store/AuthStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { isAuth, setIsAuth } = useAuthStore();

  async function me() {
    try {
      console.log("......");

      const response = await apiClient.get("/auth/me");
      console.log("Me Response:", response?.data, response.status);
      if (response.status === 200) setIsAuth(true);
    } catch (error: any) {
      console.log(
        "Me Failed",
        error?.response.data.message,
        error?.response.status
      );
    }
  }

  useEffect(() => {
    me();
    if (isAuth) {
      router.replace("/(app)/(tabs)/kitaab");
    }
  }, [isAuth]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="sign_up" />
      <Stack.Screen name="forgot_password" />
      <Stack.Screen name="reset_password" />
    </Stack>
  );
}
