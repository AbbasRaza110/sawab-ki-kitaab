import apiClient from "@/services/apiService";
import useAuthStore from "@/store/AuthStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AppLayout() {
  const { isAuth, setIsAuth } = useAuthStore();

  async function me() {
    try {
      const response = await apiClient.get("/auth/me");
      if (response.status === 200) setIsAuth(true);
    } catch (error: any) {
      console.log("Me Failed", error?.response.data.message);
    }
  }

  useEffect(() => {
    me();
    if (!isAuth) {
      router.replace("/(auth)/index");
    } else {
      router.replace("/(app)/(tabs)/kitaab");
    }
  }, [isAuth]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add_record" />
    </Stack>
  );
}
